import type { OrgMembershipStatus } from "./common";

export interface OrgMembership {
  id: string;
  orgId: string;
  userId: string;
  role: string;
  roleId?: string | null;
  status: OrgMembershipStatus;
  isActive: boolean;
  inviteEmail?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrgMembershipUser {
  id: string;
  username: string;
  email?: string | null;
  isEmailVerified?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  publicKey?: string | null;
}

export interface OrgMembershipWithUser extends Omit<OrgMembership, "createdAt" | "updatedAt"> {
  user: OrgMembershipUser;
}

export interface OrgProject {
  id: string;
  name: string;
  slug: string;
  organization: string;
  environments: Array<{ name: string; slug: string }>;
}

export interface OrgMembershipMetadata {
  key: string;
  id: string;
  value: string;
}

export interface DetailedOrgMembership extends Omit<OrgMembership, "createdAt" | "updatedAt"> {
  customRoleSlug?: string | null;
  metadata?: OrgMembershipMetadata[];
  user: OrgMembershipUser & { publicKey?: string | null };
}

export interface ProjectMembershipRole {
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
}

export interface ProjectMembership {
  id: string;
  projectId: string;
  userId: string;
  user: {
    id: string;
    email?: string | null;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    publicKey?: string | null;
  };
  project: { name: string; id: string; type: string };
  roles: ProjectMembershipRole[];
}

export interface OrgInfo {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListMembershipsParams {
  orgId: string;
}

export interface ListMembershipsResponse {
  users: OrgMembershipWithUser[];
}

export interface ListOrgProjectsParams {
  orgId: string;
}

export interface ListOrgProjectsResponse {
  workspaces: OrgProject[];
}

export interface GetMembershipParams {
  orgId: string;
  membershipId: string;
}

export interface GetMembershipResponse {
  membership: DetailedOrgMembership;
}

export interface UpdateMembershipParams {
  orgId: string;
  membershipId: string;
  role?: string;
  isActive?: boolean;
  metadata?: Array<{ key: string; value: string }>;
}

export interface UpdateMembershipResponse {
  membership: OrgMembership;
}

export interface DeleteMembershipParams {
  orgId: string;
  membershipId: string;
}

export interface DeleteMembershipResponse {
  membership: OrgMembership;
}

export interface BulkDeleteMembershipsParams {
  orgId: string;
  membershipIds: string[];
}

export interface BulkDeleteMembershipsResponse {
  memberships: OrgMembership[];
}

export interface ListProjectMembershipsByOrgMembershipParams {
  orgId: string;
  membershipId: string;
}

export interface ListProjectMembershipsByOrgMembershipResponse {
  memberships: ProjectMembership[];
}

export interface CreateOrganizationParams {
  name: string;
}

export interface CreateOrganizationResponse {
  organization: OrgInfo;
}

export interface DeleteOrganizationParams {
  orgId: string;
}

export interface DeleteOrganizationResponse {
  organization: OrgInfo;
  accessToken: string;
}

export interface UpgradePrivilegeSystemResponse {
  organization: OrgInfo;
}
