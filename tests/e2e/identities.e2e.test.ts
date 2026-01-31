import { describe, it, expect, beforeAll } from "vitest";
import { createE2EClient, loadTestState, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Identities E2E", () => {
  let client: InfisicalClient;
  let state: TestState;

  beforeAll(() => {
    state = loadTestState();
    client = createE2EClient(state);
  });

  describe("CRUD lifecycle", () => {
    let identityId: string;

    it("creates an identity", async () => {
      const name = uniqueName("e2e-identity");
      const result = await client.identities.create({
        name,
        organizationId: state.organizationId,
        role: "member",
      });

      expect(result.identity).toBeDefined();
      expect(result.identity.id).toBeTruthy();
      expect(result.identity.name).toBe(name);
      identityId = result.identity.id;
    });

    it("gets an identity by id", async () => {
      const result = await client.identities.get({ identityId });

      expect(result.identity).toBeDefined();
      expect(result.identity.id).toBe(identityId);
    });

    it("updates an identity", async () => {
      const newName = uniqueName("e2e-identity-updated");
      const result = await client.identities.update({
        identityId,
        name: newName,
      });

      expect(result.identity).toBeDefined();
      expect(result.identity.name).toBe(newName);
    });

    it("searches identities in organization", async () => {
      const result = await client.identities.search({
        organizationId: state.organizationId,
      });

      expect(result.identities).toBeDefined();
      expect(Array.isArray(result.identities)).toBe(true);
      expect(result.totalCount).toBeGreaterThan(0);
      // Should find our created identity
      const found = result.identities.some((i) => i.id === identityId);
      expect(found).toBe(true);
    });

    it("lists identity project memberships", async () => {
      const result = await client.identities.listProjectMemberships({
        identityId,
      });

      expect(result.identityMemberships).toBeDefined();
      expect(Array.isArray(result.identityMemberships)).toBe(true);
    });

    it("deletes an identity", async () => {
      const result = await client.identities.delete({ identityId });

      expect(result.identity).toBeDefined();
      expect(result.identity.id).toBe(identityId);
    });

    it("fails to get deleted identity", async () => {
      await expect(
        client.identities.get({ identityId })
      ).rejects.toThrow();
    });
  });
});
