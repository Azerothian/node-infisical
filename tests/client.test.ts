import { describe, it, expect, vi } from "vitest";
import { InfisicalClient } from "../src/client";
import { MfaResource } from "../src/resources/mfa";
import { MfaSessionsResource } from "../src/resources/mfa-sessions";
import { UsersResource } from "../src/resources/users";
import { PasswordResource } from "../src/resources/password";
import { ServiceTokensResource } from "../src/resources/service-tokens";
import { OrganizationsResource } from "../src/resources/organizations";
import { OrganizationIdentitiesResource } from "../src/resources/organization-identities";
import { SecretFoldersResource } from "../src/resources/secret-folders";
import { SecretImportsResource } from "../src/resources/secret-imports";
import { PkiCaResource } from "../src/resources/pki-ca";
import { PkiTemplatesResource } from "../src/resources/pki-templates";
import { PkiAlertsResource } from "../src/resources/pki-alerts";
import { PkiCertificatesResource } from "../src/resources/pki-certificates";

describe("InfisicalClient", () => {
  it("constructs with default base URL and exposes all resources", () => {
    const client = new InfisicalClient();

    expect(client.mfa).toBeInstanceOf(MfaResource);
    expect(client.mfaSessions).toBeInstanceOf(MfaSessionsResource);
    expect(client.users).toBeInstanceOf(UsersResource);
    expect(client.password).toBeInstanceOf(PasswordResource);
    expect(client.serviceTokens).toBeInstanceOf(ServiceTokensResource);
    expect(client.organizations).toBeInstanceOf(OrganizationsResource);
    expect(client.organizationIdentities).toBeInstanceOf(OrganizationIdentitiesResource);
    expect(client.secretFolders).toBeInstanceOf(SecretFoldersResource);
    expect(client.secretImports).toBeInstanceOf(SecretImportsResource);
    expect(client.pki.ca).toBeInstanceOf(PkiCaResource);
    expect(client.pki.templates).toBeInstanceOf(PkiTemplatesResource);
    expect(client.pki.alerts).toBeInstanceOf(PkiAlertsResource);
    expect(client.pki.certificates).toBeInstanceOf(PkiCertificatesResource);
  });

  it("starts unauthenticated", () => {
    const client = new InfisicalClient();

    expect(client.isAuthenticated).toBe(false);
    expect(client.authMode).toBeNull();
  });

  it("sets identity access token via setAccessToken", () => {
    const client = new InfisicalClient();
    client.setAccessToken("my-access-token");

    expect(client.isAuthenticated).toBe(true);
    expect(client.authMode).toBe("identityAccessToken");
  });

  it("sets JWT token via setJwtToken", () => {
    const client = new InfisicalClient();
    client.setJwtToken("my-jwt-token");

    expect(client.isAuthenticated).toBe(true);
    expect(client.authMode).toBe("jwt");
  });

  it("logout clears auth state", () => {
    const client = new InfisicalClient();
    client.setAccessToken("token");
    expect(client.isAuthenticated).toBe(true);

    client.logout();
    expect(client.isAuthenticated).toBe(false);
    expect(client.authMode).toBeNull();
  });

  it("accepts custom base URL and timeout", () => {
    const client = new InfisicalClient({
      baseUrl: "https://self-hosted.example.com",
      timeout: 60_000,
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
  });

  it("auto-renews JWT token when expired via renewFn", async () => {
    vi.useFakeTimers();
    try {
      const renewFn = vi.fn().mockResolvedValue({
        token: "renewed-jwt",
        expiresIn: 3600,
      });

      const client = new InfisicalClient();
      client.setJwtToken("original-jwt", 1, renewFn);

      expect(client.authMode).toBe("jwt");

      // Advance past the 30-second pre-expiry window
      // expiresIn=1 means expires in 1 second, but renewal triggers 30s before
      // so it should trigger immediately
      vi.advanceTimersByTime(0);

      // Access the internal auth state to trigger ensureValid
      // We need to use the auth state directly since making HTTP requests
      // requires a real fetch function
      const authState = (client as any)._authState;
      await authState.ensureValid();

      expect(renewFn).toHaveBeenCalledTimes(1);
      expect(authState.current).toEqual({ mode: "jwt", token: "renewed-jwt" });
      expect(authState.mode).toBe("jwt");
    } finally {
      vi.useRealTimers();
    }
  });

  it("auto-renews access token when expired via renewFn", async () => {
    vi.useFakeTimers();
    try {
      const renewFn = vi.fn().mockResolvedValue({
        accessToken: "renewed-access-token",
        expiresIn: 7200,
      });

      const client = new InfisicalClient();
      client.setAccessToken("original-token", 1, renewFn);

      expect(client.authMode).toBe("identityAccessToken");

      const authState = (client as any)._authState;
      await authState.ensureValid();

      expect(renewFn).toHaveBeenCalledTimes(1);
      expect(authState.current).toEqual({
        mode: "identityAccessToken",
        accessToken: "renewed-access-token",
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not auto-renew JWT without renewFn", async () => {
    vi.useFakeTimers();
    try {
      const client = new InfisicalClient();
      client.setJwtToken("my-jwt", 1);

      const authState = (client as any)._authState;
      await authState.ensureValid();

      // Token unchanged — no renewFn means no renewal
      expect(authState.current).toEqual({ mode: "jwt", token: "my-jwt" });
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not auto-renew JWT without expiresIn", async () => {
    const renewFn = vi.fn().mockResolvedValue({
      token: "should-not-be-called",
      expiresIn: 3600,
    });

    const client = new InfisicalClient();
    client.setJwtToken("my-jwt", undefined, renewFn);

    const authState = (client as any)._authState;
    await authState.ensureValid();

    // renewFn not called — no expiresIn means no expiry tracking
    expect(renewFn).not.toHaveBeenCalled();
    expect(authState.current).toEqual({ mode: "jwt", token: "my-jwt" });
  });
});
