export interface IdentityAlicloudAuth {
  id: string;
  identityId: string;
  allowedArns: string;
  allowedAccountIds: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginAlicloudAuthParams {
  identityId: string;
  stsToken: string;
  identityArn: string;
}

export interface LoginAlicloudAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachAlicloudAuthParams {
  identityId: string;
  allowedArns?: string;
  allowedAccountIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachAlicloudAuthResponse {
  identityAlicloudAuth: IdentityAlicloudAuth;
}

export interface UpdateAlicloudAuthParams {
  identityId: string;
  allowedArns?: string;
  allowedAccountIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateAlicloudAuthResponse {
  identityAlicloudAuth: IdentityAlicloudAuth;
}

export interface GetAlicloudAuthParams {
  identityId: string;
}

export interface GetAlicloudAuthResponse {
  identityAlicloudAuth: IdentityAlicloudAuth;
}

export interface RevokeAlicloudAuthParams {
  identityId: string;
}

export interface RevokeAlicloudAuthResponse {
  identityAlicloudAuth: IdentityAlicloudAuth;
}
