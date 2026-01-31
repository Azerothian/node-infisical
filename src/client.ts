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
import { IdentitiesResource } from "./resources/identities";
import { IdentityAccessTokensResource } from "./resources/identity-access-tokens";
import { IdentityUniversalAuthResource } from "./resources/identity-universal-auth";
import { IdentityTokenAuthResource } from "./resources/identity-token-auth";
import { IdentityAwsAuthResource } from "./resources/identity-aws-auth";
import { IdentityGcpAuthResource } from "./resources/identity-gcp-auth";
import { IdentityAzureAuthResource } from "./resources/identity-azure-auth";
import { IdentityKubernetesAuthResource } from "./resources/identity-kubernetes-auth";
import { IdentityOidcAuthResource } from "./resources/identity-oidc-auth";
import { IdentityJwtAuthResource } from "./resources/identity-jwt-auth";
import { IdentityLdapAuthResource } from "./resources/identity-ldap-auth";
import { IdentityTlsCertAuthResource } from "./resources/identity-tls-cert-auth";
import { IdentityOciAuthResource } from "./resources/identity-oci-auth";
import { IdentityAlicloudAuthResource } from "./resources/identity-alicloud-auth";
// Phase 3: Projects & Secrets
import { ProjectsResource } from "./resources/projects";
import { WebhooksResource } from "./resources/webhooks";
import { SecretSharingResource } from "./resources/secret-sharing";
import { SecretsResource } from "./resources/secrets";
import { KmsResource } from "./resources/kms";
import { IntegrationAuthResource } from "./resources/integration-auth";
import { AppConnectionsResource } from "./resources/app-connections";
import { SecretSyncsResource } from "./resources/secret-syncs";

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
  readonly identities: IdentitiesResource;
  readonly identityAccessTokens: IdentityAccessTokensResource;
  readonly identityAuth: {
    readonly universal: IdentityUniversalAuthResource;
    readonly token: IdentityTokenAuthResource;
    readonly aws: IdentityAwsAuthResource;
    readonly gcp: IdentityGcpAuthResource;
    readonly azure: IdentityAzureAuthResource;
    readonly kubernetes: IdentityKubernetesAuthResource;
    readonly oidc: IdentityOidcAuthResource;
    readonly jwt: IdentityJwtAuthResource;
    readonly ldap: IdentityLdapAuthResource;
    readonly tlsCert: IdentityTlsCertAuthResource;
    readonly oci: IdentityOciAuthResource;
    readonly alicloud: IdentityAlicloudAuthResource;
  };
  readonly projects: ProjectsResource;
  readonly webhooks: WebhooksResource;
  readonly secretSharing: SecretSharingResource;
  readonly secrets: SecretsResource;
  readonly kms: KmsResource;
  readonly integrationAuth: IntegrationAuthResource;
  readonly appConnections: AppConnectionsResource;
  readonly secretSyncs: SecretSyncsResource;

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
    this.identities = new IdentitiesResource(http);
    this.identityAccessTokens = new IdentityAccessTokensResource(http);
    this.identityAuth = {
      universal: new IdentityUniversalAuthResource(http),
      token: new IdentityTokenAuthResource(http),
      aws: new IdentityAwsAuthResource(http),
      gcp: new IdentityGcpAuthResource(http),
      azure: new IdentityAzureAuthResource(http),
      kubernetes: new IdentityKubernetesAuthResource(http),
      oidc: new IdentityOidcAuthResource(http),
      jwt: new IdentityJwtAuthResource(http),
      ldap: new IdentityLdapAuthResource(http),
      tlsCert: new IdentityTlsCertAuthResource(http),
      oci: new IdentityOciAuthResource(http),
      alicloud: new IdentityAlicloudAuthResource(http),
    };
    this.projects = new ProjectsResource(http);
    this.webhooks = new WebhooksResource(http);
    this.secretSharing = new SecretSharingResource(http);
    this.secrets = new SecretsResource(http);
    this.kms = new KmsResource(http);
    this.integrationAuth = new IntegrationAuthResource(http);
    this.appConnections = new AppConnectionsResource(http);
    this.secretSyncs = new SecretSyncsResource(http);
  }
}
