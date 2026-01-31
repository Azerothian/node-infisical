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

});
