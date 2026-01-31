export interface IdentityTlsCertAuth {
  id: string;
  identityId: string;
  caCert: string;
  allowedCommonNames: string;
  allowedOrganizations: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginTlsCertAuthParams {
  identityId: string;
  clientCertificate: string;
}

export interface LoginTlsCertAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachTlsCertAuthParams {
  identityId: string;
  caCert?: string;
  allowedCommonNames?: string;
  allowedOrganizations?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachTlsCertAuthResponse {
  identityTlsCertAuth: IdentityTlsCertAuth;
}

export interface UpdateTlsCertAuthParams {
  identityId: string;
  caCert?: string;
  allowedCommonNames?: string;
  allowedOrganizations?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateTlsCertAuthResponse {
  identityTlsCertAuth: IdentityTlsCertAuth;
}

export interface GetTlsCertAuthParams {
  identityId: string;
}

export interface GetTlsCertAuthResponse {
  identityTlsCertAuth: IdentityTlsCertAuth;
}

export interface RevokeTlsCertAuthParams {
  identityId: string;
}

export interface RevokeTlsCertAuthResponse {
  identityTlsCertAuth: IdentityTlsCertAuth;
}
