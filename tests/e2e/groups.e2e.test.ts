import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Groups E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let groupId: string;
  let isEnterpriseAvailable = true;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);

    // Test if groups (enterprise feature) are available
    try {
      const name = uniqueName("e2e-group");
      const result = await client.groups.create({
        organizationId: state.organizationId,
        name,
        role: "member",
      });
      groupId = result.group.id;
    } catch (error: any) {
      if (error?.statusCode === 403 || error?.statusCode === 401) {
        isEnterpriseAvailable = false;
      } else {
        throw error;
      }
    }
  });

  afterAll(async () => {
    if (groupId) {
      try {
        await client.groups.delete({ groupId });
      } catch {}
    }
  });

  it("creates a group", () => {
    if (!isEnterpriseAvailable) {
      console.log("Skipping: Groups require enterprise license");
      return;
    }
    expect(groupId).toBeTruthy();
  });

  it("gets a group by id", async () => {
    if (!isEnterpriseAvailable) return;
    const result = await client.groups.get({ groupId });
    expect(result.group).toBeDefined();
    expect(result.group.id).toBe(groupId);
  });

  it("updates a group", async () => {
    if (!isEnterpriseAvailable) return;
    const newName = uniqueName("e2e-group-updated");
    const result = await client.groups.update({
      groupId,
      name: newName,
    });
    expect(result.group).toBeDefined();
    expect(result.group.name).toBe(newName);
  });

  it("lists group users", async () => {
    if (!isEnterpriseAvailable) return;
    const result = await client.groups.listUsers({ groupId });
    expect(result.users).toBeDefined();
    expect(Array.isArray(result.users)).toBe(true);
  });
});
