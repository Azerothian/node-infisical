export interface IdentityKubernetesAuth {
  id: string;
  identityId: string;
  kubernetesHost: string;
  caCert: string;
  tokenReviewerJwt: string;
  allowedNamespaces: string;
  allowedNames: string;
  allowedAudience: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginKubernetesAuthParams {
  identityId: string;
  jwt: string;
}

export interface LoginKubernetesAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachKubernetesAuthParams {
  identityId: string;
  kubernetesHost?: string;
  caCert?: string;
  tokenReviewerJwt?: string;
  allowedNamespaces?: string;
  allowedNames?: string;
  allowedAudience?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachKubernetesAuthResponse {
  identityKubernetesAuth: IdentityKubernetesAuth;
}

export interface UpdateKubernetesAuthParams {
  identityId: string;
  kubernetesHost?: string;
  caCert?: string;
  tokenReviewerJwt?: string;
  allowedNamespaces?: string;
  allowedNames?: string;
  allowedAudience?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateKubernetesAuthResponse {
  identityKubernetesAuth: IdentityKubernetesAuth;
}

export interface GetKubernetesAuthParams {
  identityId: string;
}

export interface GetKubernetesAuthResponse {
  identityKubernetesAuth: IdentityKubernetesAuth;
}

export interface RevokeKubernetesAuthParams {
  identityId: string;
}

export interface RevokeKubernetesAuthResponse {
  identityKubernetesAuth: IdentityKubernetesAuth;
}
