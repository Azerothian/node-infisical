import { HttpClient } from "./http";
import type { FetchFunction } from "./http";
import { AuthState } from "./auth-state";
import type { LoginResponse } from "./auth-state";
import { AuthManager } from "./auth-manager";
import type { LoginParams } from "./auth-manager";
import type { AuthMode } from "./types/auth-modes";
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
import { PkiCertificatesResource } from "./resources/pki-certificates";
import { SecretTagsResource } from "./resources/secret-tags";
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
import { ProjectsResource } from "./resources/projects";
import { WebhooksResource } from "./resources/webhooks";
import { SecretSharingResource } from "./resources/secret-sharing";
import { SecretsResource } from "./resources/secrets";
import { KmsResource } from "./resources/kms";
import { IntegrationAuthResource } from "./resources/integration-auth";
import { AppConnectionsResource } from "./resources/app-connections";
import { SecretSyncsResource } from "./resources/secret-syncs";
import { AdminResource } from "./resources/admin";
import { OrgAdminResource } from "./resources/org-admin";

export interface InfisicalClientConfig {
  baseUrl?: string;
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
  readonly pki: {
    readonly ca: PkiCaResource;
    readonly templates: PkiTemplatesResource;
    readonly alerts: PkiAlertsResource;
    readonly certificates: PkiCertificatesResource;
  };
  readonly secretTags: SecretTagsResource;
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
  readonly admin: AdminResource;
  readonly orgAdmin: OrgAdminResource;

  private readonly _authState: AuthState;
  private readonly _authManager: AuthManager;

  constructor(config: InfisicalClientConfig = {}) {
    this._authState = new AuthState();
    const http = new HttpClient({
      baseUrl: config.baseUrl ?? "https://app.infisical.com",
      authState: this._authState,
      fetch: config.fetch ?? fetch,
      timeout: config.timeout ?? 30_000,
      headers: config.headers,
    });

    const as = this._authState;

    this.mfa = new MfaResource(http, as);
    this.mfaSessions = new MfaSessionsResource(http, as);
    this.users = new UsersResource(http, as);
    this.password = new PasswordResource(http, as);
    this.serviceTokens = new ServiceTokensResource(http, as);
    this.organizations = new OrganizationsResource(http, as);
    this.organizationIdentities = new OrganizationIdentitiesResource(http, as);
    this.secretFolders = new SecretFoldersResource(http, as);
    this.secretImports = new SecretImportsResource(http, as);
    this.pki = {
      ca: new PkiCaResource(http, as),
      templates: new PkiTemplatesResource(http, as),
      alerts: new PkiAlertsResource(http, as),
      certificates: new PkiCertificatesResource(http, as),
    };
    this.secretTags = new SecretTagsResource(http, as);
    this.identities = new IdentitiesResource(http, as);
    this.identityAccessTokens = new IdentityAccessTokensResource(http, as);

    const identityAuthResources = {
      universal: new IdentityUniversalAuthResource(http, as),
      token: new IdentityTokenAuthResource(http, as),
      aws: new IdentityAwsAuthResource(http, as),
      gcp: new IdentityGcpAuthResource(http, as),
      azure: new IdentityAzureAuthResource(http, as),
      kubernetes: new IdentityKubernetesAuthResource(http, as),
      oidc: new IdentityOidcAuthResource(http, as),
      jwt: new IdentityJwtAuthResource(http, as),
      ldap: new IdentityLdapAuthResource(http, as),
      tlsCert: new IdentityTlsCertAuthResource(http, as),
      oci: new IdentityOciAuthResource(http, as),
      alicloud: new IdentityAlicloudAuthResource(http, as),
    };
    this.identityAuth = identityAuthResources;

    this._authManager = new AuthManager(this._authState, identityAuthResources);

    this.projects = new ProjectsResource(http, as);
    this.webhooks = new WebhooksResource(http, as);
    this.secretSharing = new SecretSharingResource(http, as);
    this.secrets = new SecretsResource(http, as);
    this.kms = new KmsResource(http, as);
    this.integrationAuth = new IntegrationAuthResource(http, as);
    this.appConnections = new AppConnectionsResource(http, as);
    this.secretSyncs = new SecretSyncsResource(http, as);
    this.admin = new AdminResource(http, as);
    this.orgAdmin = new OrgAdminResource(http, as);
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    return this._authManager.login(params);
  }

  get isAuthenticated(): boolean {
    return this._authState.isAuthenticated;
  }

  get authMode(): AuthMode | null {
    return this._authState.mode as AuthMode | null;
  }

  logout(): void {
    this._authState.clearAuth();
  }
}
