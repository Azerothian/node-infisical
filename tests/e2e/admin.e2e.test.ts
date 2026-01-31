import { describe, it, expect, beforeAll } from "vitest";
import { createE2EClient, loadTestState, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Admin E2E", () => {
  let client: InfisicalClient;
  let state: TestState;

  beforeAll(() => {
    state = loadTestState();
    client = createE2EClient(state);
  });

  // Config

  it("gets admin config", async () => {
    const result = await client.admin.getConfig();
    expect(result).toBeDefined();
    expect(result.config).toBeDefined();
    expect(typeof result.config.initialized).toBe("boolean");
  });

  // User Management

  it("lists admin users", async () => {
    const result = await client.admin.listUsers();
    expect(result).toBeDefined();
    expect(Array.isArray(result.users)).toBe(true);
    expect(result.users.length).toBeGreaterThanOrEqual(1);
  });

  it("lists admin users with search", async () => {
    const result = await client.admin.listUsers({ searchTerm: "admin", limit: 5 });
    expect(result).toBeDefined();
    expect(Array.isArray(result.users)).toBe(true);
  });

  // Organization Management

  it("lists admin organizations", async () => {
    const result = await client.admin.listOrganizations();
    expect(result).toBeDefined();
    expect(Array.isArray(result.organizations)).toBe(true);
    expect(result.organizations.length).toBeGreaterThanOrEqual(1);
  });

  it("creates and deletes an organization", async () => {
    const name = uniqueName("admin-e2e-org");
    const created = await client.admin.createOrganization({ name, inviteAdminEmails: ["admin@test.local"] });
    expect(created).toBeDefined();
    expect(created.organization).toBeDefined();

    const orgId = (created.organization as { id: string }).id;
    expect(orgId).toBeDefined();

    const deleted = await client.admin.deleteOrganization({ organizationId: orgId });
    expect(deleted).toBeDefined();
  });

  // Identity Management

  it("lists admin identities", async () => {
    const result = await client.admin.listIdentities();
    expect(result).toBeDefined();
    expect(Array.isArray(result.identities)).toBe(true);
    expect(result.identities.length).toBeGreaterThanOrEqual(1);
  });

  // Encryption

  it("gets encryption strategies", async () => {
    const result = await client.admin.getEncryptionStrategies();
    expect(result).toBeDefined();
    expect(Array.isArray(result.strategies)).toBe(true);
    for (const s of result.strategies) {
      expect(typeof s.strategy).toBe("string");
      expect(typeof s.enabled).toBe("boolean");
    }
  });

  // Cache

  it("gets cache status", async () => {
    const result = await client.admin.getCacheStatus();
    expect(result).toBeDefined();
    expect(typeof result.invalidating).toBe("boolean");
  });
});

describe("Org Admin E2E", () => {
  let client: InfisicalClient;
  let state: TestState;

  beforeAll(() => {
    state = loadTestState();
    client = createE2EClient(state);
  });

  it("lists org admin projects", async () => {
    // This endpoint may not be available in all Infisical versions
    try {
      const result = await client.orgAdmin.listProjects();
      expect(result).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
      expect(typeof result.count).toBe("number");
    } catch (error: unknown) {
      // Skip if route is not available (older Infisical versions)
      if (error && typeof error === "object" && "statusCode" in error && (error as { statusCode: number }).statusCode === 404) {
        return;
      }
      throw error;
    }
  });
});
