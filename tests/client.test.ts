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

describe("InfisicalClient", () => {
  it("constructs with JWT auth and default base URL", () => {
    const client = new InfisicalClient({
      auth: { mode: "jwt", token: "test-token" },
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
    expect(client.mfaSessions).toBeInstanceOf(MfaSessionsResource);
    expect(client.users).toBeInstanceOf(UsersResource);
    expect(client.password).toBeInstanceOf(PasswordResource);
    expect(client.serviceTokens).toBeInstanceOf(ServiceTokensResource);
    expect(client.organizations).toBeInstanceOf(OrganizationsResource);
    expect(client.organizationIdentities).toBeInstanceOf(OrganizationIdentitiesResource);
    expect(client.secretFolders).toBeInstanceOf(SecretFoldersResource);
    expect(client.secretImports).toBeInstanceOf(SecretImportsResource);
    expect(client.pkiCa).toBeInstanceOf(PkiCaResource);
    expect(client.pkiTemplates).toBeInstanceOf(PkiTemplatesResource);
    expect(client.pkiAlerts).toBeInstanceOf(PkiAlertsResource);
  });

  it("constructs with API key auth", () => {
    const client = new InfisicalClient({
      auth: { mode: "apiKey", apiKey: "my-api-key" },
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
  });

  it("constructs with service token auth", () => {
    const client = new InfisicalClient({
      auth: { mode: "serviceToken", serviceToken: "st.xxx" },
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
  });

  it("constructs with identity access token auth", () => {
    const client = new InfisicalClient({
      auth: { mode: "identityAccessToken", accessToken: "iat-xxx" },
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
  });

  it("accepts custom base URL and timeout", () => {
    const client = new InfisicalClient({
      baseUrl: "https://self-hosted.example.com",
      auth: { mode: "jwt", token: "t" },
      timeout: 60_000,
    });

    expect(client.mfa).toBeInstanceOf(MfaResource);
  });
});
