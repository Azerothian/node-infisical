// Super Admin Config
export interface SuperAdminConfig {
  id?: string;
  initialized: boolean;
  allowSignUp: boolean;
  defaultAuthOrgId?: string | null;
  defaultAuthOrgSlug?: string | null;
  enabledLoginMethods?: string[];
  trustSamlEmails?: boolean;
  trustLdapEmails?: boolean;
  trustOidcEmails?: boolean;
  isSecretScanningDisabled?: boolean;
  instancerId?: string | null;
  projectLimit?: number;
  [key: string]: unknown;
}

// Bootstrap & Signup
export interface BootstrapInstanceParams {
  email: string;
  password: string;
  organization: string;
}

export interface BootstrapInstanceResponse {
  message: string;
  user: Record<string, unknown>;
  organization: Record<string, unknown>;
  identity: {
    credentials: {
      token: string;
    };
  };
}

export interface AdminSignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface AdminSignUpResponse {
  message: string;
  user: Record<string, unknown>;
  organization: Record<string, unknown>;
  token: string;
  new: boolean;
}

// Config
export interface GetAdminConfigResponse {
  config: SuperAdminConfig;
}

export interface UpdateAdminConfigParams {
  allowSignUp?: boolean;
  defaultAuthOrgId?: string | null;
  enabledLoginMethods?: string[];
  trustSamlEmails?: boolean;
  trustLdapEmails?: boolean;
  trustOidcEmails?: boolean;
  isSecretScanningDisabled?: boolean;
  projectLimit?: number;
  [key: string]: unknown;
}

export interface UpdateAdminConfigResponse {
  config: SuperAdminConfig;
}

// User Management
export interface ListAdminUsersParams {
  searchTerm?: string;
  offset?: number;
  limit?: number;
}

export interface ListAdminUsersResponse {
  users: Record<string, unknown>[];
  totalCount: number;
}

export interface DeleteAdminUserParams {
  userId: string;
}

export interface DeleteAdminUserResponse {
  user: Record<string, unknown>;
}

export interface DeleteAdminUsersParams {
  userIds: string[];
}

export interface DeleteAdminUsersResponse {
  users: Record<string, unknown>[];
}

export interface GrantAdminAccessParams {
  userId: string;
}

export interface GrantAdminAccessResponse {
  user: Record<string, unknown>;
}

export interface RevokeAdminAccessParams {
  userId: string;
}

export interface RevokeAdminAccessResponse {
  user: Record<string, unknown>;
}

// Organization Management
export interface ListAdminOrganizationsParams {
  searchTerm?: string;
  offset?: number;
  limit?: number;
}

export interface ListAdminOrganizationsResponse {
  organizations: Record<string, unknown>[];
  totalCount: number;
}

export interface CreateAdminOrganizationParams {
  name: string;
  inviteAdminEmails: string[];
}

export interface CreateAdminOrganizationResponse {
  organization: Record<string, unknown>;
}

export interface DeleteAdminOrganizationParams {
  organizationId: string;
}

export interface DeleteAdminOrganizationResponse {
  organization: Record<string, unknown>;
}

export interface DeleteAdminOrgMembershipParams {
  organizationId: string;
  membershipId: string;
}

export interface DeleteAdminOrgMembershipResponse {
  membership: Record<string, unknown>;
}

export interface ResendOrgInviteParams {
  organizationId: string;
  membershipId: string;
}

export interface ResendOrgInviteResponse {
  membership: Record<string, unknown>;
}

export interface JoinOrganizationParams {
  organizationId: string;
}

export interface JoinOrganizationResponse {
  membership: Record<string, unknown>;
}

// Identity Management
export interface ListAdminIdentitiesParams {
  searchTerm?: string;
  offset?: number;
  limit?: number;
}

export interface ListAdminIdentitiesResponse {
  identities: Record<string, unknown>[];
  totalCount: number;
}

export interface RevokeIdentitySuperAdminParams {
  identityId: string;
}

export interface RevokeIdentitySuperAdminResponse {
  identity: Record<string, unknown>;
}

// Integrations
export interface GetAdminIntegrationsResponse {
  slack: Record<string, unknown>;
  microsoftTeams: Record<string, unknown>;
  githubAppConnection: Record<string, unknown>;
}

// Encryption
export interface GetEncryptionStrategiesResponse {
  strategies: Array<{
    strategy: string;
    enabled: boolean;
  }>;
}

export interface UpdateEncryptionStrategyParams {
  strategy: string;
}

export interface UpdateEncryptionStrategyResponse {
  strategies: Array<{
    strategy: string;
    enabled: boolean;
  }>;
}

// Environment Overrides
export interface GetEnvOverridesResponse {
  overrides: Record<string, unknown>;
}

// Cache
export interface InvalidateCacheParams {
  type: "all" | "secrets";
}

export interface InvalidateCacheResponse {
  message: string;
}

export interface GetCacheStatusResponse {
  invalidating: boolean;
}

// Usage Report
export interface GenerateUsageReportResponse {
  csvContent: string;
  signature: string;
  filename: string;
}
