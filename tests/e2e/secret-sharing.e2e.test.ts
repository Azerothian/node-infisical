import { describe, it, expect, beforeAll } from "vitest";
import { createE2EClient, loadTestState } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";
import { randomBytes, createHash } from "crypto";

describe("Secret Sharing E2E", () => {
  let client: InfisicalClient;
  let state: TestState;

  beforeAll(() => {
    state = loadTestState();
    client = createE2EClient(state);
  });

  describe("shared secret lifecycle", () => {
    let sharedSecretId: string;
    const hashedHex = createHash("sha256").update("e2e-test-secret").digest("hex");
    const iv = randomBytes(12).toString("hex");
    const tag = randomBytes(16).toString("hex");
    const encryptedValue = randomBytes(32).toString("hex");

    it("creates a shared secret", async () => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const result = await client.secretSharing.create({
        encryptedValue,
        iv,
        tag,
        hashedHex,
        expiresAt,
        expiresAfterViews: 10,
        accessType: "anyone",
      });

      expect(result.id).toBeTruthy();
      sharedSecretId = result.id;
    });

    it("gets a shared secret", async () => {
      const result = await client.secretSharing.get({
        sharedSecretId,
        hashedHex,
      });

      expect(result.encryptedValue).toBe(encryptedValue);
      expect(result.iv).toBe(iv);
      expect(result.tag).toBe(tag);
      expect(result.accessType).toBe("anyone");
    });

    it("lists shared secrets", async () => {
      const result = await client.secretSharing.list();

      expect(result.secrets).toBeDefined();
      expect(Array.isArray(result.secrets)).toBe(true);
      expect(result.secrets.length).toBeGreaterThan(0);
    });

    it("deletes a shared secret", async () => {
      const result = await client.secretSharing.delete({ sharedSecretId });

      expect(result.secret).toBeDefined();
      expect(result.secret.id).toBe(sharedSecretId);
    });
  });
});
