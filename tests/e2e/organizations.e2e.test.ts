import { describe, it, expect, beforeAll } from "vitest";
import { createE2EClient, loadTestState } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Organizations E2E", () => {
  let client: InfisicalClient;
  let state: TestState;

  beforeAll(() => {
    state = loadTestState();
    client = createE2EClient(state);
  });

  it("lists organization memberships", async () => {
    const result = await client.organizations.listMemberships({
      orgId: state.organizationId,
    });
    expect(result.memberships).toBeDefined();
    expect(Array.isArray(result.memberships)).toBe(true);
  });

  it("lists organization projects", async () => {
    const result = await client.organizations.listProjects({
      orgId: state.organizationId,
    });
    expect(result.workspaces).toBeDefined();
    expect(Array.isArray(result.workspaces)).toBe(true);
  });
});
