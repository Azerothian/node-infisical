export interface Identity {
  id: string;
  name: string;
  authMethod?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityWithMetadata extends Identity {
  metadata?: Array<{ key: string; value: string }>;
}

export interface IdentityProjectMembership {
  id: string;
  identityId: string;
  projectId: string;
  roles: Array<{
    id: string;
    role: string;
    customRoleId?: string | null;
    customRoleName?: string | null;
    customRoleSlug?: string | null;
    isTemporary: boolean;
    temporaryMode?: string | null;
    temporaryRange?: string | null;
    temporaryAccessStartTime?: string | null;
    temporaryAccessEndTime?: string | null;
  }>;
  project: {
    name: string;
    id: string;
    type: string;
  };
  identity: {
    id: string;
    name: string;
    authMethod?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdentityParams {
  name: string;
  organizationId: string;
  role?: string;
  metadata?: Record<string, string>;
}

export interface CreateIdentityResponse {
  identity: Identity;
}

export interface UpdateIdentityParams {
  identityId: string;
  name?: string;
  role?: string;
  metadata?: Record<string, string>;
}

export interface UpdateIdentityResponse {
  identity: Identity;
}

export interface DeleteIdentityParams {
  identityId: string;
}

export interface DeleteIdentityResponse {
  identity: Identity;
}

export interface GetIdentityParams {
  identityId: string;
}

export interface GetIdentityResponse {
  identity: IdentityWithMetadata;
}

export interface ListIdentityProjectMembershipsParams {
  identityId: string;
}

export interface ListIdentityProjectMembershipsResponse {
  identityMemberships: IdentityProjectMembership[];
}

export interface SearchIdentitiesParams {
  organizationId: string;
  searchFilter?: string;
  offset?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: string;
}

export interface SearchIdentitiesResponse {
  identities: IdentityWithMetadata[];
  totalCount: number;
}
