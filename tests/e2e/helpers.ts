import { readFileSync } from "fs";
import { resolve } from "path";
import { InfisicalClient } from "../../src/client";

export interface TestState {
  baseUrl: string;
  accessToken: string;
  organizationId: string;
  organizationName: string;
}

export function loadTestState(): TestState {
  const stateFile = resolve(__dirname, ".test-state.json");
  return JSON.parse(readFileSync(stateFile, "utf-8"));
}

export function createE2EClient(state?: TestState): InfisicalClient {
  const s = state ?? loadTestState();
  return new InfisicalClient({
    baseUrl: s.baseUrl,
    auth: { mode: "identityAccessToken", accessToken: s.accessToken },
  });
}

export async function createTestProject(
  state: TestState,
  name: string,
  type: string = "secret-manager"
): Promise<{ projectId: string; slug: string; environments: Array<{ id: string; name: string; slug: string }> }> {
  const response = await fetch(`${state.baseUrl}/api/v1/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.accessToken}`,
    },
    body: JSON.stringify({
      projectName: name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type,
      shouldCreateDefaultEnvs: true,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create project: ${response.status} ${text}`);
  }

  const data = await response.json() as {
    project: {
      id: string;
      slug: string;
      environments: Array<{ id: string; name: string; slug: string }>;
    };
  };

  return {
    projectId: data.project.id,
    slug: data.project.slug,
    environments: data.project.environments,
  };
}

export async function deleteTestProject(
  state: TestState,
  projectId: string
): Promise<void> {
  await fetch(`${state.baseUrl}/api/v1/workspace/${encodeURIComponent(projectId)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.accessToken}`,
    },
  });
}

export function uniqueName(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
