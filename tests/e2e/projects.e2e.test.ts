import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, createTestProject, deleteTestProject, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Projects E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let projectId: string;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);
    const project = await createTestProject(state, uniqueName("e2e-proj"));
    projectId = project.projectId;
  });

  afterAll(async () => {
    try {
      await deleteTestProject(state, projectId);
    } catch {}
  });

  it("gets a project", async () => {
    const result = await client.projects.get({ projectId });
    expect(result.workspace).toBeDefined();
    expect(result.workspace.id).toBe(projectId);
    expect(result.workspace.name).toBeTruthy();
  });

  it("updates a project name", async () => {
    const newName = uniqueName("e2e-proj-updated");
    const result = await client.projects.update({ projectId, name: newName });
    expect(result.workspace).toBeDefined();
    expect(result.workspace.name).toBe(newName);
  });

  it("lists project memberships", async () => {
    const result = await client.projects.listMemberships({ projectId });
    expect(result.memberships).toBeDefined();
    expect(Array.isArray(result.memberships)).toBe(true);
  });

  it("lists default environments", async () => {
    const result = await client.projects.listEnvironments({ projectId });
    expect(result.environments).toBeDefined();
    expect(Array.isArray(result.environments)).toBe(true);
    // Default envs should include dev, staging, prod
    expect(result.environments.length).toBeGreaterThanOrEqual(1);
  });

  describe("environments", () => {
    let envId: string;

    it("creates an environment", async () => {
      const result = await client.projects.createEnvironment({
        projectId,
        name: "E2E Testing",
        slug: uniqueName("e2e-env"),
      });
      expect(result.environment).toBeDefined();
      expect(result.environment.id).toBeTruthy();
      expect(result.environment.name).toBe("E2E Testing");
      envId = result.environment.id;
    });

    it("updates an environment", async () => {
      const result = await client.projects.updateEnvironment({
        projectId,
        environmentId: envId,
        name: "E2E Testing Updated",
      });
      expect(result.environment).toBeDefined();
      expect(result.environment.name).toBe("E2E Testing Updated");
    });

    it("deletes an environment", async () => {
      const result = await client.projects.deleteEnvironment({
        projectId,
        environmentId: envId,
      });
      expect(result.environment).toBeDefined();
      expect(result.environment.id).toBe(envId);
    });
  });

  it("lists project roles", async () => {
    const result = await client.projects.listRoles({ projectId });
    expect(result.roles).toBeDefined();
    expect(Array.isArray(result.roles)).toBe(true);
  });

  it("lists project tags", async () => {
    const result = await client.projects.listTags({ projectId });
    expect(result.tags).toBeDefined();
    expect(Array.isArray(result.tags)).toBe(true);
  });
});
