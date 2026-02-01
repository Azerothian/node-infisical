import { describe, it, expect } from "vitest";
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
});
