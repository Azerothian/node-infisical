import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Identity Universal Auth E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let identityId: string;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);

    // Create a test identity
    const name = uniqueName("e2e-ua-identity");
    const result = await client.identities.create({
      name,
      organizationId: state.organizationId,
      role: "member",
    });
    identityId = result.identity.id;
  });

  afterAll(async () => {
    // Cleanup: delete the identity
    try {
      await client.identities.delete({ identityId });
    } catch {
      // Ignore cleanup errors
    }
  });

  it("attaches universal auth to identity", async () => {
    const result = await client.identityAuth.universal.attach({
      identityId,
      clientSecretTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
      accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
      accessTokenTTL: 2592000,
      accessTokenMaxTTL: 2592000,
      accessTokenNumUsesLimit: 0,
    });

    expect(result.identityUniversalAuth).toBeDefined();
    expect(result.identityUniversalAuth.identityId).toBe(identityId);
    expect(result.identityUniversalAuth.clientId).toBeTruthy();
  });

  it("gets universal auth config", async () => {
    const result = await client.identityAuth.universal.get({ identityId });

    expect(result.identityUniversalAuth).toBeDefined();
    expect(result.identityUniversalAuth.identityId).toBe(identityId);
    expect(result.identityUniversalAuth.clientId).toBeTruthy();
  });

  it("updates universal auth config", async () => {
    const result = await client.identityAuth.universal.update({
      identityId,
      accessTokenTTL: 86400,
    });

    expect(result.identityUniversalAuth).toBeDefined();
    expect(result.identityUniversalAuth.accessTokenTTL).toBe(86400);
  });

  describe("client secrets", () => {
    let clientId: string;
    let clientSecret: string;
    let clientSecretId: string;

    it("creates a client secret", async () => {
      // Get clientId first
      const authConfig = await client.identityAuth.universal.get({ identityId });
      clientId = authConfig.identityUniversalAuth.clientId;

      const result = await client.identityAuth.universal.createClientSecret({
        identityId,
        description: "E2E test secret",
        numUsesLimit: 0,
        ttl: 0,
      });

      expect(result.clientSecret).toBeTruthy();
      expect(result.clientSecretData).toBeDefined();
      expect(result.clientSecretData.id).toBeTruthy();
      clientSecret = result.clientSecret;
      clientSecretId = result.clientSecretData.id;
    });

    it("lists client secrets", async () => {
      const result = await client.identityAuth.universal.listClientSecrets({
        identityId,
      });

      expect(result.clientSecretData).toBeDefined();
      expect(Array.isArray(result.clientSecretData)).toBe(true);
      expect(result.clientSecretData.length).toBeGreaterThan(0);
    });

    it("gets a client secret by id", async () => {
      const result = await client.identityAuth.universal.getClientSecret({
        identityId,
        clientSecretId,
      });

      expect(result.clientSecretData).toBeDefined();
      expect(result.clientSecretData.id).toBe(clientSecretId);
    });

    it("logs in with client credentials", async () => {
      const result = await client.identityAuth.universal.login({
        clientId,
        clientSecret,
      });

      expect(result.accessToken).toBeTruthy();
      expect(result.tokenType).toBe("Bearer");
      expect(result.expiresIn).toBeGreaterThan(0);
    });

  });

  it("revokes universal auth from identity", async () => {
    const result = await client.identityAuth.universal.revoke({ identityId });

    expect(result.identityUniversalAuth).toBeDefined();
    expect(result.identityUniversalAuth.identityId).toBe(identityId);
  });
});
