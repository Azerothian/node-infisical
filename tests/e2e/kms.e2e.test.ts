import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, createTestProject, deleteTestProject, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("KMS E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let projectId: string;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);
    const project = await createTestProject(state, uniqueName("e2e-kms"));
    projectId = project.projectId;
  });

  afterAll(async () => {
    try {
      await deleteTestProject(state, projectId);
    } catch {}
  });

  describe("key lifecycle", () => {
    let keyId: string;

    it("creates a KMS key", async () => {
      const result = await client.kms.createKey({
        projectId,
        name: uniqueName("e2e-key"),
        description: "E2E test key",
      });
      expect(result.key).toBeDefined();
      expect(result.key.id).toBeTruthy();
      expect(result.key.projectId).toBe(projectId);
      keyId = result.key.id;
    });

    it("gets a key by id", async () => {
      const result = await client.kms.getKey({ keyId });
      expect(result.key).toBeDefined();
      expect(result.key.id).toBe(keyId);
    });

    it("lists keys in project", async () => {
      const result = await client.kms.listKeys({ projectId });
      expect(result.keys).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
      expect(result.keys.length).toBeGreaterThan(0);
      const found = result.keys.some((k) => k.id === keyId);
      expect(found).toBe(true);
    });

    it("updates a key", async () => {
      const result = await client.kms.updateKey({
        keyId,
        description: "Updated E2E key",
      });
      expect(result.key).toBeDefined();
      expect(result.key.description).toBe("Updated E2E key");
    });

    it("encrypts and decrypts data", async () => {
      const plaintext = btoa("Hello, E2E KMS test!");

      const encryptResult = await client.kms.encrypt({
        keyId,
        plaintext,
      });
      expect(encryptResult.ciphertext).toBeTruthy();

      const decryptResult = await client.kms.decrypt({
        keyId,
        ciphertext: encryptResult.ciphertext,
      });
      expect(decryptResult.plaintext).toBe(plaintext);
    });

    it("deletes a key", async () => {
      const result = await client.kms.deleteKey({ keyId });
      expect(result.key).toBeDefined();
      expect(result.key.id).toBe(keyId);
    });
  });
});
