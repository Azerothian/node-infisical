export interface IdentityLdapAuth {
  id: string;
  identityId: string;
  ldapConfigId: string;
  allowedGroups: string;
  allowedGroupsDN: string;
  accessTokenTTL: number;
  accessTokenMaxTTL: number;
  accessTokenNumUsesLimit: number;
  accessTokenTrustedIps: Array<{ ipAddress: string; prefix?: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginLdapAuthParams {
  identityId: string;
  username: string;
  password: string;
  ldapConfigId?: string;
}

export interface LoginLdapAuthResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface AttachLdapAuthParams {
  identityId: string;
  ldapConfigId?: string;
  allowedGroups?: string;
  allowedGroupsDN?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface AttachLdapAuthResponse {
  identityLdapAuth: IdentityLdapAuth;
}

export interface UpdateLdapAuthParams {
  identityId: string;
  ldapConfigId?: string;
  allowedGroups?: string;
  allowedGroupsDN?: string;
  accessTokenTTL?: number;
  accessTokenMaxTTL?: number;
  accessTokenNumUsesLimit?: number;
  accessTokenTrustedIps?: Array<{ ipAddress: string }>;
}

export interface UpdateLdapAuthResponse {
  identityLdapAuth: IdentityLdapAuth;
}

export interface GetLdapAuthParams {
  identityId: string;
}

export interface GetLdapAuthResponse {
  identityLdapAuth: IdentityLdapAuth;
}

export interface RevokeLdapAuthParams {
  identityId: string;
}

export interface RevokeLdapAuthResponse {
  identityLdapAuth: IdentityLdapAuth;
}
