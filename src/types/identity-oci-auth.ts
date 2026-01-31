export interface IdentityOciAuth {
  id: string;
  identityId: string;
  tenancyOcid: string;
  allowedUserOcids: string;
  allowedCompartmentOcids: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginOciAuthParams {
  identityId: string;
  userOcid: string;
  requestHeaders: string;
}

export interface LoginOciAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachOciAuthParams {
  identityId: string;
  tenancyOcid?: string;
  allowedUserOcids?: string;
  allowedCompartmentOcids?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachOciAuthResponse {
  identityOciAuth: IdentityOciAuth;
}

export interface UpdateOciAuthParams {
  identityId: string;
  tenancyOcid?: string;
  allowedUserOcids?: string;
  allowedCompartmentOcids?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateOciAuthResponse {
  identityOciAuth: IdentityOciAuth;
}

export interface GetOciAuthParams {
  identityId: string;
}

export interface GetOciAuthResponse {
  identityOciAuth: IdentityOciAuth;
}

export interface RevokeOciAuthParams {
  identityId: string;
}

export interface RevokeOciAuthResponse {
  identityOciAuth: IdentityOciAuth;
}
