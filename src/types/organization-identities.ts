import type { OrgIdentityOrderBy, OrderByDirection } from "./common";

export interface IdentityOrgMembership {
  id: string;
  identityId: string;
  orgId: string;
  role: string;
  roleId?: string | null;
  createdAt: string;
  updatedAt: string;
  customRole?: {
    id: string;
    name: string;
    slug: string;
    permissions: unknown;
    description?: string | null;
  };
  identity: {
    id: string;
    name: string;
    orgId: string;
    authMethods: string[];
  };
}

export interface ListIdentityMembershipsParams {
  orgId: string;
  offset?: number;
  limit?: number;
  orderBy?: OrgIdentityOrderBy;
  orderDirection?: OrderByDirection;
  search?: string;
}

export interface ListIdentityMembershipsResponse {
  identityMemberships: IdentityOrgMembership[];
  totalCount: number;
}
