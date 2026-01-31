export interface IdentityJwtAuth {
  id: string;
  identityId: string;
  configurationType: string;
  jwksUrl: string;
  jwksCaCert: string;
  publicKeys: string[];
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

export interface LoginJwtAuthParams {
  identityId: string;
  jwt: string;
}

export interface LoginJwtAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachJwtAuthParams {
  identityId: string;
  configurationType?: string;
  jwksUrl?: string;
  jwksCaCert?: string;
  publicKeys?: string[];
  boundIssuer?: string;
  boundAudiences?: string;
  boundClaims?: Record<string, string>;
  boundSubject?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachJwtAuthResponse {
  identityJwtAuth: IdentityJwtAuth;
}

export interface UpdateJwtAuthParams {
  identityId: string;
  configurationType?: string;
  jwksUrl?: string;
  jwksCaCert?: string;
  publicKeys?: string[];
  boundIssuer?: string;
  boundAudiences?: string;
  boundClaims?: Record<string, string>;
  boundSubject?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateJwtAuthResponse {
  identityJwtAuth: IdentityJwtAuth;
}

export interface GetJwtAuthParams {
  identityId: string;
}

export interface GetJwtAuthResponse {
  identityJwtAuth: IdentityJwtAuth;
}

export interface RevokeJwtAuthParams {
  identityId: string;
}

export interface RevokeJwtAuthResponse {
  identityJwtAuth: IdentityJwtAuth;
}
