import { describe, it, expect } from "vitest";
import { InfisicalClient } from "../../src/client";
import { createMockFetch } from "../helpers";

function createTestClient(mockFetch: ReturnType<typeof createMockFetch>["mockFetch"]) {
  const client = new InfisicalClient({
    baseUrl: "https://test.infisical.com",
    fetch: mockFetch as unknown as typeof globalThis.fetch,
  });
  client.setJwtToken("test");
  return client;
}

describe("SecretImportsResource", () => {
  it("creates a secret import", async () => {
    const secretImport = {
      id: "si1",
      folderId: "f1",
      importPath: "/shared",
      importEnv: { name: "Prod", slug: "prod", id: "e2" },
      position: 1,
    };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok", secretImport } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretImports.create({
      projectId: "proj-1",
      environment: "dev",
      import: { environment: "prod", path: "/shared" },
    });

    expect(result.secretImport).toEqual(secretImport);
    expect(calls[0].url).toContain("/api/v2/secret-imports");
    expect(calls[0].init.method).toBe("POST");
  });

  it("updates a secret import", async () => {
    const secretImport = { id: "si1", folderId: "f1", importPath: "/other", position: 2 };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok", secretImport } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretImports.update({
      secretImportId: "si1",
      projectId: "proj-1",
      environment: "dev",
      import: { position: 2 },
    });

    expect(result.secretImport.position).toBe(2);
    expect(calls[0].url).toContain("/api/v2/secret-imports/si1");
    expect(calls[0].init.method).toBe("PATCH");
  });

  it("deletes a secret import", async () => {
    const secretImport = { id: "si1", folderId: "f1" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok", secretImport } },
    ]);
    const client = createTestClient(mockFetch);

    await client.secretImports.delete({
      secretImportId: "si1",
      projectId: "proj-1",
      environment: "dev",
    });

    expect(calls[0].url).toContain("/api/v2/secret-imports/si1");
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("lists secret imports", async () => {
    const secretImports = [{ id: "si1" }, { id: "si2" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok", secretImports } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretImports.list({
      projectId: "proj-1",
      environment: "dev",
    });

    expect(result.secretImports).toHaveLength(2);
    expect(calls[0].url).toContain("projectId=proj-1");
  });

  it("gets raw secrets from imports", async () => {
    const secrets = [
      { secretPath: "/", environment: "prod", environmentInfo: { id: "e1", name: "Prod", slug: "prod" }, secrets: [] },
    ];
    const { mockFetch } = createMockFetch([
      { status: 200, body: { secrets } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretImports.getRawSecrets({
      projectId: "proj-1",
      environment: "dev",
    });

    expect(result.secrets).toHaveLength(1);
  });

  it("resyncs replication", async () => {
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { message: "ok" } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretImports.resyncReplication({
      secretImportId: "si1",
      projectId: "proj-1",
      environment: "dev",
    });

    expect(result.message).toBe("ok");
    expect(calls[0].url).toContain("/replication-resync");
    expect(calls[0].init.method).toBe("POST");
  });
});
