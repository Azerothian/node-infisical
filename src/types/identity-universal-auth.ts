export interface IdentityUniversalAuth {
  id: string;
  identityId: string;
  clientId: string;
  clientSecretTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface UniversalAuthClientSecret {
  id: string;
  identityUniversalAuthId: string;
  isClientSecretRevoked: boolean;
  description: string;
  clientSecretPrefix: string;
  clientSecretNumUses: number;
  clientSecretNumUsesLimit: number;
  clientSecretTTL: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginUniversalAuthParams {
  clientId: string;
  clientSecret: string;
}

export interface LoginUniversalAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachUniversalAuthParams {
  identityId: string;
  clientSecretTrustedIps?: Array<{ ipAddress: string }>;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachUniversalAuthResponse {
  identityUniversalAuth: IdentityUniversalAuth;
}

export interface UpdateUniversalAuthParams {
  identityId: string;
  clientSecretTrustedIps?: Array<{ ipAddress: string }>;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateUniversalAuthResponse {
  identityUniversalAuth: IdentityUniversalAuth;
}

export interface GetUniversalAuthParams {
  identityId: string;
}

export interface GetUniversalAuthResponse {
  identityUniversalAuth: IdentityUniversalAuth;
}

export interface RevokeUniversalAuthParams {
  identityId: string;
}

export interface RevokeUniversalAuthResponse {
  identityUniversalAuth: IdentityUniversalAuth;
}

export interface CreateUniversalAuthClientSecretParams {
  identityId: string;
  description?: string;
  numUsesLimit?: number;
  ttl?: number;
}

export interface CreateUniversalAuthClientSecretResponse {
  clientSecret: string;
  clientSecretData: UniversalAuthClientSecret;
}

export interface ListUniversalAuthClientSecretsParams {
  identityId: string;
}

export interface ListUniversalAuthClientSecretsResponse {
  clientSecretData: UniversalAuthClientSecret[];
}

export interface GetUniversalAuthClientSecretParams {
  identityId: string;
  clientSecretId: string;
}

export interface GetUniversalAuthClientSecretResponse {
  clientSecretData: UniversalAuthClientSecret;
}

export interface RevokeUniversalAuthClientSecretParams {
  identityId: string;
  clientSecretId: string;
}

export interface RevokeUniversalAuthClientSecretResponse {
  clientSecretData: UniversalAuthClientSecret;
}
