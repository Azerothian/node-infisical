import { describe, it, expect } from "vitest";
import { InfisicalClient } from "../../src/client";
import { createMockFetch } from "../helpers";
import { MfaMethod } from "../../src/types/common";

function createTestClient(mockFetch: ReturnType<typeof createMockFetch>["mockFetch"]) {
  return new InfisicalClient({
    auth: { mode: "jwt", token: "test" },
    baseUrl: "https://test.infisical.com",
    fetch: mockFetch as unknown as typeof globalThis.fetch,
  });
}

describe("UsersResource", () => {
  it("gets current user", async () => {
    const user = { id: "u1", username: "alice", email: "a@b.com" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { user } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.getMe();

    expect(result.user).toEqual(user);
    expect(calls[0].url).toContain("/api/v2/users/me");
    expect(calls[0].init.method).toBe("GET");
  });

  it("updates user name", async () => {
    const user = { id: "u1", firstName: "Bob", lastName: "Smith" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { user } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.updateName({
      firstName: "Bob",
      lastName: "Smith",
    });

    expect(result.user.firstName).toBe("Bob");
    expect(calls[0].init.method).toBe("PATCH");
    expect(calls[0].url).toContain("/api/v2/users/me/name");
  });

  it("updates MFA settings", async () => {
    const user = { id: "u1", isMfaEnabled: true };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { user } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.updateMfa({
      isMfaEnabled: true,
      selectedMfaMethod: MfaMethod.TOTP,
    });

    expect(result.user.isMfaEnabled).toBe(true);
    expect(calls[0].init.method).toBe("PATCH");
  });

  it("lists organizations", async () => {
    const organizations = [{ id: "org-1", name: "Org" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { organizations } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.listOrganizations();

    expect(result.organizations).toHaveLength(1);
    expect(calls[0].url).toContain("/api/v2/users/me/organizations");
  });

  it("lists API keys", async () => {
    const apiKeys = [{ id: "k1", name: "my-key" }];
    const { mockFetch } = createMockFetch([
      { status: 200, body: apiKeys },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.listApiKeys();

    expect(result).toHaveLength(1);
  });

  it("creates API key", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { apiKey: "ak-123", apiKeyData: { id: "k1", name: "test" } } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.createApiKey({ name: "test", expiresIn: 86400 });

    expect(result.apiKey).toBe("ak-123");
    expect(calls[0].init.method).toBe("POST");
  });

  it("deletes API key", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { apiKeyData: { id: "k1", name: "test" } } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.deleteApiKey("k1");

    expect(result.apiKeyData.id).toBe("k1");
    expect(calls[0].url).toContain("/api/v2/users/me/api-keys/k1");
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("lists sessions", async () => {
    const sessions = [{ id: "s1", userId: "u1" }];
    const { mockFetch } = createMockFetch([
      { status: 200, body: sessions },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.listSessions();

    expect(result).toHaveLength(1);
  });

  it("revokes all sessions", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok" } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.revokeAllSessions();

    expect(result.message).toBe("ok");
    expect(calls[0].init.method).toBe("DELETE");
    expect(calls[0].url).toContain("/api/v2/users/me/sessions");
  });

  it("revokes single session", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok" } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.revokeSession("s1");

    expect(result.message).toBe("ok");
    expect(calls[0].url).toContain("/api/v2/users/me/sessions/s1");
  });

  it("deletes current user", async () => {
    const user = { id: "u1" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { user } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.users.deleteMe();

    expect(result.user.id).toBe("u1");
    expect(calls[0].init.method).toBe("DELETE");
  });
});
