import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, createTestProject, deleteTestProject, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Secret Folders E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let projectId: string;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);
    const project = await createTestProject(state, uniqueName("e2e-folders"));
    projectId = project.projectId;
  });

  afterAll(async () => {
    try {
      await deleteTestProject(state, projectId);
    } catch {}
  });

  describe("CRUD lifecycle", () => {
    let folderId: string;

    it("creates a folder", async () => {
      const result = await client.secretFolders.create({
        projectId,
        environment: "dev",
        name: "e2e-test-folder",
        path: "/",
      });
      expect(result.folder).toBeDefined();
      expect(result.folder.id).toBeTruthy();
      expect(result.folder.name).toBe("e2e-test-folder");
      folderId = result.folder.id;
    });

    it("lists folders", async () => {
      const result = await client.secretFolders.list({
        projectId,
        environment: "dev",
        path: "/",
      });
      expect(result.folders).toBeDefined();
      expect(Array.isArray(result.folders)).toBe(true);
      const found = result.folders.some((f: any) => f.id === folderId);
      expect(found).toBe(true);
    });

    it("gets a folder by id", async () => {
      const result = await client.secretFolders.getById({ id: folderId });
      expect(result.folder).toBeDefined();
      expect(result.folder.id).toBe(folderId);
    });

    it("updates a folder", async () => {
      const result = await client.secretFolders.update({
        folderId,
        projectId,
        environment: "dev",
        name: "e2e-folder-renamed",
      });
      expect(result.folder).toBeDefined();
      expect(result.folder.name).toBe("e2e-folder-renamed");
    });

    it("deletes a folder", async () => {
      const result = await client.secretFolders.delete({
        folderIdOrName: folderId,
        projectId,
        environment: "dev",
      });
      expect(result.folder).toBeDefined();
    });
  });
});
