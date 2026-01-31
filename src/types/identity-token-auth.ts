export interface IdentityTokenAuth {
  id: string;
  identityId: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityTokenAuthToken {
  id: string;
  identityTokenAuthId: string;
  name: string;
  isTokenRevoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginTokenAuthParams {
  identityId: string;
}

export interface LoginTokenAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachTokenAuthParams {
  identityId: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachTokenAuthResponse {
  identityTokenAuth: IdentityTokenAuth;
}

export interface UpdateTokenAuthParams {
  identityId: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateTokenAuthResponse {
  identityTokenAuth: IdentityTokenAuth;
}

export interface GetTokenAuthParams {
  identityId: string;
}

export interface GetTokenAuthResponse {
  identityTokenAuth: IdentityTokenAuth;
}

export interface RevokeTokenAuthParams {
  identityId: string;
}

export interface RevokeTokenAuthResponse {
  identityTokenAuth: IdentityTokenAuth;
}

export interface CreateTokenAuthTokenParams {
  identityId: string;
  name?: string;
}

export interface CreateTokenAuthTokenResponse {
  accessToken: string;
  tokenData: IdentityTokenAuthToken;
}

export interface ListTokenAuthTokensParams {
  identityId: string;
  offset?: number;
  limit?: number;
}

export interface ListTokenAuthTokensResponse {
  tokens: IdentityTokenAuthToken[];
}

export interface GetTokenAuthTokenParams {
  identityId: string;
  tokenId: string;
}

export interface GetTokenAuthTokenResponse {
  token: IdentityTokenAuthToken;
}

export interface UpdateTokenAuthTokenParams {
  identityId: string;
  tokenId: string;
  name?: string;
}

export interface UpdateTokenAuthTokenResponse {
  token: IdentityTokenAuthToken;
}

export interface RevokeTokenAuthTokenParams {
  identityId: string;
  tokenId: string;
}

export interface RevokeTokenAuthTokenResponse {
  token: IdentityTokenAuthToken;
}
