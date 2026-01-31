export interface IdentityAzureAuth {
  id: string;
  identityId: string;
  tenantId: string;
  resource: string;
  allowedServicePrincipalIds: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginAzureAuthParams {
  identityId: string;
  jwt: string;
}

export interface LoginAzureAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachAzureAuthParams {
  identityId: string;
  tenantId?: string;
  resource?: string;
  allowedServicePrincipalIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachAzureAuthResponse {
  identityAzureAuth: IdentityAzureAuth;
}

export interface UpdateAzureAuthParams {
  identityId: string;
  tenantId?: string;
  resource?: string;
  allowedServicePrincipalIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateAzureAuthResponse {
  identityAzureAuth: IdentityAzureAuth;
}

export interface GetAzureAuthParams {
  identityId: string;
}

export interface GetAzureAuthResponse {
  identityAzureAuth: IdentityAzureAuth;
}

export interface RevokeAzureAuthParams {
  identityId: string;
}

export interface RevokeAzureAuthResponse {
  identityAzureAuth: IdentityAzureAuth;
}
