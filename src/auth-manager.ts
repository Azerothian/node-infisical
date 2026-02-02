import type { AuthState, LoginResponse } from "./auth-state";
import type { IdentityUniversalAuthResource } from "./resources/identity-universal-auth";
import type { IdentityTokenAuthResource } from "./resources/identity-token-auth";
import type { IdentityAwsAuthResource } from "./resources/identity-aws-auth";
import type { IdentityGcpAuthResource } from "./resources/identity-gcp-auth";
import type { IdentityAzureAuthResource } from "./resources/identity-azure-auth";
import type { IdentityKubernetesAuthResource } from "./resources/identity-kubernetes-auth";
import type { IdentityOidcAuthResource } from "./resources/identity-oidc-auth";
import type { IdentityJwtAuthResource } from "./resources/identity-jwt-auth";
import type { IdentityLdapAuthResource } from "./resources/identity-ldap-auth";
import type { IdentityTlsCertAuthResource } from "./resources/identity-tls-cert-auth";
import type { IdentityOciAuthResource } from "./resources/identity-oci-auth";
import type { IdentityAlicloudAuthResource } from "./resources/identity-alicloud-auth";
import type { LoginUniversalAuthParams } from "./types/identity-universal-auth";
import type { LoginTokenAuthParams } from "./types/identity-token-auth";
import type { LoginAwsAuthParams } from "./types/identity-aws-auth";
import type { LoginGcpAuthParams } from "./types/identity-gcp-auth";
import type { LoginAzureAuthParams } from "./types/identity-azure-auth";
import type { LoginKubernetesAuthParams } from "./types/identity-kubernetes-auth";
import type { LoginOidcAuthParams } from "./types/identity-oidc-auth";
import type { LoginJwtAuthParams } from "./types/identity-jwt-auth";
import type { LoginLdapAuthParams } from "./types/identity-ldap-auth";
import type { LoginTlsCertAuthParams } from "./types/identity-tls-cert-auth";
import type { LoginOciAuthParams } from "./types/identity-oci-auth";
import type { LoginAlicloudAuthParams } from "./types/identity-alicloud-auth";

export type LoginParams =
  | { universalAuth: LoginUniversalAuthParams }
  | { tokenAuth: LoginTokenAuthParams }
  | { awsAuth: LoginAwsAuthParams }
  | { gcpAuth: LoginGcpAuthParams }
  | { azureAuth: LoginAzureAuthParams }
  | { kubernetesAuth: LoginKubernetesAuthParams }
  | { oidcAuth: LoginOidcAuthParams }
  | { jwtAuth: LoginJwtAuthParams }
  | { ldapAuth: LoginLdapAuthParams }
  | { tlsCertAuth: LoginTlsCertAuthParams }
  | { ociAuth: LoginOciAuthParams }
  | { alicloudAuth: LoginAlicloudAuthParams };

export type LoginParamsOrFactory = LoginParams | (() => Promise<LoginParams> | LoginParams);

export interface IdentityAuthResources {
  universal: IdentityUniversalAuthResource;
  token: IdentityTokenAuthResource;
  aws: IdentityAwsAuthResource;
  gcp: IdentityGcpAuthResource;
  azure: IdentityAzureAuthResource;
  kubernetes: IdentityKubernetesAuthResource;
  oidc: IdentityOidcAuthResource;
  jwt: IdentityJwtAuthResource;
  ldap: IdentityLdapAuthResource;
  tlsCert: IdentityTlsCertAuthResource;
  oci: IdentityOciAuthResource;
  alicloud: IdentityAlicloudAuthResource;
}

export class AuthManager {
  private readonly authState: AuthState;
  private readonly resources: IdentityAuthResources;

  constructor(authState: AuthState, resources: IdentityAuthResources) {
    this.authState = authState;
    this.resources = resources;
  }

  async login(params: LoginParams | (() => Promise<LoginParams> | LoginParams)): Promise<LoginResponse> {
    const resolvedParams = typeof params === 'function' ? await params() : params;
    const loginFn = this.resolveLoginFn(resolvedParams);
    const response = await loginFn();
    this.authState.setAuth(
      { mode: "identityAccessToken", accessToken: response.accessToken },
      response.expiresIn
    );
    this.authState.setRenewFn(async () => {
      const renewParams = typeof params === 'function' ? await params() : params;
      const response = await this.resolveLoginFn(renewParams)();
      return {
        auth: { mode: "identityAccessToken" as const, accessToken: response.accessToken },
        expiresIn: response.expiresIn,
      };
    });
    return response;
  }

  private resolveLoginFn(params: LoginParams): () => Promise<LoginResponse> {
    if ("universalAuth" in params) {
      return () => this.resources.universal.login(params.universalAuth);
    }
    if ("tokenAuth" in params) {
      return () => this.resources.token.login(params.tokenAuth);
    }
    if ("awsAuth" in params) {
      return () => this.resources.aws.login(params.awsAuth);
    }
    if ("gcpAuth" in params) {
      return () => this.resources.gcp.login(params.gcpAuth);
    }
    if ("azureAuth" in params) {
      return () => this.resources.azure.login(params.azureAuth);
    }
    if ("kubernetesAuth" in params) {
      return () => this.resources.kubernetes.login(params.kubernetesAuth);
    }
    if ("oidcAuth" in params) {
      return () => this.resources.oidc.login(params.oidcAuth);
    }
    if ("jwtAuth" in params) {
      return () => this.resources.jwt.login(params.jwtAuth);
    }
    if ("ldapAuth" in params) {
      return () => this.resources.ldap.login(params.ldapAuth);
    }
    if ("tlsCertAuth" in params) {
      return () => this.resources.tlsCert.login(params.tlsCertAuth);
    }
    if ("ociAuth" in params) {
      return () => this.resources.oci.login(params.ociAuth);
    }
    if ("alicloudAuth" in params) {
      return () => this.resources.alicloud.login(params.alicloudAuth);
    }
    throw new Error("Invalid login params: no recognized auth method key");
  }
}
