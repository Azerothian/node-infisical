import { describe, it, expect } from "vitest";
import { HttpClient } from "../src/http";
import { AuthState } from "../src/auth-state";
import type { AuthConfig } from "../src/types/auth";
import {
  InfisicalApiError,
  InfisicalNetworkError,
  NotFoundError,
  UnauthorizedError,
} from "../src/errors";
import { createMockFetch, createErrorFetch } from "./helpers";

function createAuthState(
  authMode: "jwt" | "apiKey" | "serviceToken" | "identityAccessToken" = "jwt"
): AuthState {
  const authState = new AuthState();
  const auth: AuthConfig =
    authMode === "jwt"
      ? { mode: "jwt", token: "test-jwt" }
      : authMode === "apiKey"
        ? { mode: "apiKey", apiKey: "test-key" }
        : authMode === "serviceToken"
          ? { mode: "serviceToken", serviceToken: "st-token" }
          : { mode: "identityAccessToken", accessToken: "iat-token" };
  authState.setAuth(auth);
  return authState;
}

function createClient(
  mockFetch: ReturnType<typeof createMockFetch>["mockFetch"],
  authMode: "jwt" | "apiKey" | "serviceToken" | "identityAccessToken" = "jwt"
) {
  return new HttpClient({
    baseUrl: "https://app.infisical.com",
    authState: createAuthState(authMode),
    fetch: mockFetch as unknown as typeof globalThis.fetch,
    timeout: 5000,
  });
}

function createUnauthenticatedClient(
  mockFetch: ReturnType<typeof createMockFetch>["mockFetch"]
) {
  return new HttpClient({
    baseUrl: "https://app.infisical.com",
    authState: new AuthState(),
    fetch: mockFetch as unknown as typeof globalThis.fetch,
    timeout: 5000,
  });
}

describe("HttpClient", () => {
  it("makes GET requests with correct URL and auth header", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { data: "ok" } },
    ]);
    const client = createClient(mockFetch);

    const result = await client.get<{ data: string }>("/test", {
      foo: "bar",
      num: 42,
    });

    expect(result).toEqual({ data: "ok" });
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      "https://app.infisical.com/api/v2/test?foo=bar&num=42"
    );
    expect((calls[0].init.headers as Record<string, string>)["Authorization"]).toBe(
      "Bearer test-jwt"
    );
  });

  it("uses X-API-KEY header for apiKey auth", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: {} },
    ]);
    const client = createClient(mockFetch, "apiKey");

    await client.get("/test");

    expect((calls[0].init.headers as Record<string, string>)["X-API-KEY"]).toBe(
      "test-key"
    );
  });

  it("makes POST requests with body", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { id: "123" } },
    ]);
    const client = createClient(mockFetch);

    const result = await client.post<{ id: string }>("/items", {
      name: "test",
    });

    expect(result).toEqual({ id: "123" });
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.body).toBe(JSON.stringify({ name: "test" }));
  });

  it("makes PATCH requests", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { updated: true } },
    ]);
    const client = createClient(mockFetch);

    await client.patch("/items/1", { name: "updated" });

    expect(calls[0].init.method).toBe("PATCH");
  });

  it("makes PUT requests", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: {} },
    ]);
    const client = createClient(mockFetch);

    await client.put("/items/1", { name: "replaced" });

    expect(calls[0].init.method).toBe("PUT");
  });

  it("makes DELETE requests with body", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { deleted: true } },
    ]);
    const client = createClient(mockFetch);

    await client.delete("/items/1", { confirm: true });

    expect(calls[0].init.method).toBe("DELETE");
    expect(calls[0].init.body).toBe(JSON.stringify({ confirm: true }));
  });

  it("strips undefined query params", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: {} },
    ]);
    const client = createClient(mockFetch);

    await client.get("/test", { a: "1", b: undefined, c: null });

    expect(calls[0].url).toBe("https://app.infisical.com/api/v2/test?a=1");
  });

  it("throws NotFoundError on 404", async () => {
    const { mockFetch } = createMockFetch([
      { status: 404, body: { message: "not found" } },
    ]);
    const client = createClient(mockFetch);

    await expect(client.get("/missing")).rejects.toThrow(NotFoundError);
  });

  it("throws UnauthorizedError on 401", async () => {
    const { mockFetch } = createMockFetch([
      { status: 401, body: { message: "unauthorized" } },
    ]);
    const client = createClient(mockFetch);

    await expect(client.get("/secret")).rejects.toThrow(UnauthorizedError);
  });

  it("throws InfisicalApiError with request ID from headers", async () => {
    const { mockFetch } = createMockFetch([
      {
        status: 500,
        body: { message: "server error" },
        headers: { "x-request-id": "req-abc" },
      },
    ]);
    const client = createClient(mockFetch);

    try {
      await client.get("/fail");
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(InfisicalApiError);
      expect((err as InfisicalApiError).requestId).toBe("req-abc");
    }
  });

  it("throws InfisicalNetworkError on fetch failure", async () => {
    const mockFetch = createErrorFetch(new TypeError("fetch failed"));
    const client = new HttpClient({
      baseUrl: "https://app.infisical.com",
      authState: createAuthState(),
      fetch: mockFetch as unknown as typeof globalThis.fetch,
      timeout: 5000,
    });

    await expect(client.get("/test")).rejects.toThrow(InfisicalNetworkError);
  });

  describe("postNoAuth", () => {
    it("skips auth header when using postNoAuth", async () => {
      const { mockFetch, calls } = createMockFetch([
        { status: 200, body: { accessToken: "new-token" } },
      ]);
      const client = createClient(mockFetch);

      const result = await client.postNoAuth<{ accessToken: string }>(
        "/api/v1/auth/universal-auth/login",
        { clientId: "id", clientSecret: "secret" }
      );

      expect(result).toEqual({ accessToken: "new-token" });
      expect(calls).toHaveLength(1);
      expect(calls[0].init.method).toBe("POST");
      const headers = calls[0].init.headers as Record<string, string>;
      expect(headers["Authorization"]).toBeUndefined();
    });

    it("works without any auth configured", async () => {
      const { mockFetch, calls } = createMockFetch([
        { status: 200, body: { token: "boot-token" } },
      ]);
      const client = createUnauthenticatedClient(mockFetch);

      const result = await client.postNoAuth<{ token: string }>(
        "/api/v1/admin/bootstrap",
        { email: "admin@test.com" }
      );

      expect(result).toEqual({ token: "boot-token" });
      expect(calls).toHaveLength(1);
      expect(calls[0].init.body).toBe(
        JSON.stringify({ email: "admin@test.com" })
      );
    });

    it("sends body and query params correctly", async () => {
      const { mockFetch, calls } = createMockFetch([
        { status: 200, body: { ok: true } },
      ]);
      const client = createClient(mockFetch);

      await client.postNoAuth("/api/v1/auth/login", { data: 1 }, { q: "val" });

      expect(calls[0].url).toContain("?q=val");
      expect(calls[0].init.body).toBe(JSON.stringify({ data: 1 }));
    });
  });
});
