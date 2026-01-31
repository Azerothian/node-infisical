export interface IdentityGcpAuth {
  id: string;
  identityId: string;
  type: string;
  allowedServiceAccounts: string;
  allowedProjects: string;
  allowedZones: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginGcpAuthParams {
  identityId: string;
  jwt: string;
}

export interface LoginGcpAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachGcpAuthParams {
  identityId: string;
  type?: string;
  allowedServiceAccounts?: string;
  allowedProjects?: string;
  allowedZones?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachGcpAuthResponse {
  identityGcpAuth: IdentityGcpAuth;
}

export interface UpdateGcpAuthParams {
  identityId: string;
  type?: string;
  allowedServiceAccounts?: string;
  allowedProjects?: string;
  allowedZones?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateGcpAuthResponse {
  identityGcpAuth: IdentityGcpAuth;
}

export interface GetGcpAuthParams {
  identityId: string;
}

export interface GetGcpAuthResponse {
  identityGcpAuth: IdentityGcpAuth;
}

export interface RevokeGcpAuthParams {
  identityId: string;
}

export interface RevokeGcpAuthResponse {
  identityGcpAuth: IdentityGcpAuth;
}
