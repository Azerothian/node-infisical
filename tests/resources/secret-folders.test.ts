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

describe("SecretFoldersResource", () => {
  it("creates a folder", async () => {
    const folder = { id: "f1", name: "staging", envId: "e1", path: "/" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folder } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.create({
      projectId: "proj-1",
      environment: "dev",
      name: "staging",
      path: "/",
    });

    expect(result.folder).toEqual(folder);
    expect(calls[0].url).toContain("/api/v2/folders");
    expect(calls[0].init.method).toBe("POST");
  });

  it("updates a folder", async () => {
    const folder = { id: "f1", name: "renamed", envId: "e1", path: "/" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folder } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.update({
      folderId: "f1",
      projectId: "proj-1",
      environment: "dev",
      name: "renamed",
    });

    expect(result.folder.name).toBe("renamed");
    expect(calls[0].url).toContain("/api/v2/folders/f1");
    expect(calls[0].init.method).toBe("PATCH");
  });

  it("lists folders with query params", async () => {
    const folders = [{ id: "f1", name: "root", envId: "e1" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folders } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.list({
      projectId: "proj-1",
      environment: "dev",
      path: "/",
      recursive: true,
    });

    expect(result.folders).toEqual(folders);
    expect(calls[0].url).toContain("projectId=proj-1");
    expect(calls[0].url).toContain("recursive=true");
    expect(calls[0].init.method).toBe("GET");
  });

  it("deletes a folder", async () => {
    const folder = { id: "f1", name: "staging", envId: "e1" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folder } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.delete({
      folderIdOrName: "f1",
      projectId: "proj-1",
      environment: "dev",
    });

    expect(result.folder).toEqual(folder);
    expect(calls[0].url).toContain("/api/v2/folders/f1");
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("gets folder by id", async () => {
    const folder = {
      id: "f1",
      name: "staging",
      envId: "e1",
      environment: { envId: "e1", envName: "Dev", envSlug: "dev" },
      path: "/",
      projectId: "proj-1",
    };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folder } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.getById({ id: "f1" });

    expect(result.folder).toEqual(folder);
    expect(calls[0].url).toContain("/api/v2/folders/f1");
  });

  it("updates folders in batch", async () => {
    const folders = [{ id: "f1", name: "renamed", envId: "e1" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { folders } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.secretFolders.updateBatch({
      projectId: "proj-1",
      folders: [{ id: "f1", environment: "dev", name: "renamed" }],
    });

    expect(result.folders).toEqual(folders);
    expect(calls[0].url).toContain("/api/v2/folders/batch");
    expect(calls[0].init.method).toBe("PATCH");
  });
});
