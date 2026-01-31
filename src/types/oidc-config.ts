import type { OidcConfigurationType, JwtSignatureAlgorithm } from "./common";

export interface OidcConfig {
  id: string;
  issuer: string;
  authorizationEndpoint: string;
  configurationType: OidcConfigurationType;
  discoveryURL: string;
  jwksUri: string;
  tokenEndpoint: string;
  userinfoEndpoint: string;
  orgId: string;
  isActive: boolean;
  allowedEmailDomains: string;
  manageGroupMemberships: boolean;
  jwtSignatureAlgorithm: JwtSignatureAlgorithm;
}

export interface OidcConfigWithSecrets extends OidcConfig {
  clientId: string;
  clientSecret: string;
}

export interface GetOidcConfigParams {
  organizationId: string;
}

export type GetOidcConfigResponse = OidcConfigWithSecrets;

export interface CreateOidcConfigParams {
  organizationId: string;
  allowedEmailDomains?: string;
  configurationType: OidcConfigurationType;
  issuer?: string;
  discoveryURL?: string;
  authorizationEndpoint?: string;
  jwksUri?: string;
  tokenEndpoint?: string;
  userinfoEndpoint?: string;
  clientId: string;
  clientSecret: string;
  isActive: boolean;
  manageGroupMemberships?: boolean;
  jwtSignatureAlgorithm?: JwtSignatureAlgorithm;
}

export type CreateOidcConfigResponse = OidcConfig;

export interface UpdateOidcConfigParams {
  organizationId: string;
  allowedEmailDomains?: string;
  configurationType?: OidcConfigurationType;
  discoveryURL?: string;
  issuer?: string;
  authorizationEndpoint?: string;
  jwksUri?: string;
  tokenEndpoint?: string;
  userinfoEndpoint?: string;
  clientId?: string;
  clientSecret?: string;
  isActive?: boolean;
  manageGroupMemberships?: boolean;
  jwtSignatureAlgorithm?: JwtSignatureAlgorithm;
}

export type UpdateOidcConfigResponse = OidcConfig;
