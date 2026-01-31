import { HttpClient } from "./http";
import type { FetchFunction } from "./http";
import type { AuthConfig } from "./types/auth";
import { MfaResource } from "./resources/mfa";
import { MfaSessionsResource } from "./resources/mfa-sessions";
import { UsersResource } from "./resources/users";
import { PasswordResource } from "./resources/password";
import { ServiceTokensResource } from "./resources/service-tokens";
import { OrganizationsResource } from "./resources/organizations";
import { OrganizationIdentitiesResource } from "./resources/organization-identities";
import { SecretFoldersResource } from "./resources/secret-folders";
import { SecretImportsResource } from "./resources/secret-imports";
import { PkiCaResource } from "./resources/pki-ca";
import { PkiTemplatesResource } from "./resources/pki-templates";
import { PkiAlertsResource } from "./resources/pki-alerts";

export interface InfisicalClientConfig {
  baseUrl?: string;
  auth: AuthConfig;
  fetch?: FetchFunction;
  timeout?: number;
  headers?: Record<string, string>;
}

export class InfisicalClient {
  readonly mfa: MfaResource;
  readonly mfaSessions: MfaSessionsResource;
  readonly users: UsersResource;
  readonly password: PasswordResource;
  readonly serviceTokens: ServiceTokensResource;
  readonly organizations: OrganizationsResource;
  readonly organizationIdentities: OrganizationIdentitiesResource;
  readonly secretFolders: SecretFoldersResource;
  readonly secretImports: SecretImportsResource;
  readonly pkiCa: PkiCaResource;
  readonly pkiTemplates: PkiTemplatesResource;
  readonly pkiAlerts: PkiAlertsResource;

  constructor(config: InfisicalClientConfig) {
    const http = new HttpClient({
      baseUrl: config.baseUrl ?? "https://app.infisical.com",
      auth: config.auth,
      fetch: config.fetch ?? fetch,
      timeout: config.timeout ?? 30_000,
      headers: config.headers,
    });

    this.mfa = new MfaResource(http);
    this.mfaSessions = new MfaSessionsResource(http);
    this.users = new UsersResource(http);
    this.password = new PasswordResource(http);
    this.serviceTokens = new ServiceTokensResource(http);
    this.organizations = new OrganizationsResource(http);
    this.organizationIdentities = new OrganizationIdentitiesResource(http);
    this.secretFolders = new SecretFoldersResource(http);
    this.secretImports = new SecretImportsResource(http);
    this.pkiCa = new PkiCaResource(http);
    this.pkiTemplates = new PkiTemplatesResource(http);
    this.pkiAlerts = new PkiAlertsResource(http);
  }
}
