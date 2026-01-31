export interface IdentityOidcAuth {
  id: string;
  identityId: string;
  oidcDiscoveryUrl: string;
  caCert: string;
  boundIssuer: string;
  boundAudiences: string;
  boundClaims: Record<string, string>;
  boundSubject: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginOidcAuthParams {
  identityId: string;
  jwt: string;
}

export interface LoginOidcAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachOidcAuthParams {
  identityId: string;
  oidcDiscoveryUrl?: string;
  caCert?: string;
  boundIssuer?: string;
  boundAudiences?: string;
  boundClaims?: Record<string, string>;
  boundSubject?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachOidcAuthResponse {
  identityOidcAuth: IdentityOidcAuth;
}

export interface UpdateOidcAuthParams {
  identityId: string;
  oidcDiscoveryUrl?: string;
  caCert?: string;
  boundIssuer?: string;
  boundAudiences?: string;
  boundClaims?: Record<string, string>;
  boundSubject?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateOidcAuthResponse {
  identityOidcAuth: IdentityOidcAuth;
}

export interface GetOidcAuthParams {
  identityId: string;
}

export interface GetOidcAuthResponse {
  identityOidcAuth: IdentityOidcAuth;
}

export interface RevokeOidcAuthParams {
  identityId: string;
}

export interface RevokeOidcAuthResponse {
  identityOidcAuth: IdentityOidcAuth;
}
