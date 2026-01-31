export interface IdentityAwsAuth {
  id: string;
  identityId: string;
  stsEndpoint: string;
  allowedPrincipalArns: string;
  allowedAccountIds: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginAwsAuthParams {
  identityId: string;
  iamHttpRequestMethod: string;
  iamRequestBody: string;
  iamRequestHeaders: string;
}

export interface LoginAwsAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachAwsAuthParams {
  identityId: string;
  stsEndpoint?: string;
  allowedPrincipalArns?: string;
  allowedAccountIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachAwsAuthResponse {
  identityAwsAuth: IdentityAwsAuth;
}

export interface UpdateAwsAuthParams {
  identityId: string;
  stsEndpoint?: string;
  allowedPrincipalArns?: string;
  allowedAccountIds?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateAwsAuthResponse {
  identityAwsAuth: IdentityAwsAuth;
}

export interface GetAwsAuthParams {
  identityId: string;
}

export interface GetAwsAuthResponse {
  identityAwsAuth: IdentityAwsAuth;
}

export interface RevokeAwsAuthParams {
  identityId: string;
}

export interface RevokeAwsAuthResponse {
  identityAwsAuth: IdentityAwsAuth;
}
