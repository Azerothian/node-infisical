export interface Project {
  id: string;
  name: string;
  slug: string;
  orgId: string;
  type: string;
  version: number;
  environments: Array<{
    id: string;
    name: string;
    slug: string;
    position: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMembershipEntry {
  id: string;
  userId: string;
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
  user: {
    id: string;
    email?: string | null;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRole {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  permissions: unknown[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTag {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TrustedIp {
  id: string;
  projectId: string;
  ipAddress: string;
  type: string;
  prefix?: number;
  isActive: boolean;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectParams {
  projectId: string;
}

export interface GetProjectResponse {
  workspace: Project;
}

export interface UpdateProjectParams {
  projectId: string;
  name?: string;
  autoCapitalization?: boolean;
}

export interface UpdateProjectResponse {
  workspace: Project;
}

export interface DeleteProjectParams {
  projectId: string;
}

export interface DeleteProjectResponse {
  workspace: Project;
}

export interface ListProjectMembershipsParams {
  projectId: string;
}

export interface ListProjectMembershipsResponse {
  memberships: ProjectMembershipEntry[];
}

export interface ListProjectEnvironmentsParams {
  projectId: string;
}

export interface ListProjectEnvironmentsResponse {
  environments: Array<{
    id: string;
    name: string;
    slug: string;
    position: number;
  }>;
}

export interface CreateProjectEnvironmentParams {
  projectId: string;
  name: string;
  slug: string;
  position?: number;
}

export interface CreateProjectEnvironmentResponse {
  environment: {
    id: string;
    name: string;
    slug: string;
    position: number;
  };
}

export interface UpdateProjectEnvironmentParams {
  projectId: string;
  environmentId: string;
  name?: string;
  slug?: string;
  position?: number;
}

export interface UpdateProjectEnvironmentResponse {
  environment: {
    id: string;
    name: string;
    slug: string;
    position: number;
  };
}

export interface DeleteProjectEnvironmentParams {
  projectId: string;
  environmentId: string;
}

export interface DeleteProjectEnvironmentResponse {
  environment: {
    id: string;
    name: string;
    slug: string;
    position: number;
  };
}

export interface ListProjectRolesParams {
  projectId: string;
}

export interface ListProjectRolesResponse {
  roles: ProjectRole[];
}

export interface ListProjectTagsParams {
  projectId: string;
}

export interface ListProjectTagsResponse {
  tags: ProjectTag[];
}

export interface ListTrustedIpsParams {
  projectId: string;
}

export interface ListTrustedIpsResponse {
  trustedIps: TrustedIp[];
}

export interface CreateTrustedIpParams {
  projectId: string;
  ipAddress: string;
  comment?: string;
  isActive?: boolean;
}

export interface CreateTrustedIpResponse {
  trustedIp: TrustedIp;
}

export interface UpdateTrustedIpParams {
  projectId: string;
  trustedIpId: string;
  ipAddress?: string;
  comment?: string;
  isActive?: boolean;
}

export interface UpdateTrustedIpResponse {
  trustedIp: TrustedIp;
}

export interface DeleteTrustedIpParams {
  projectId: string;
  trustedIpId: string;
}

export interface DeleteTrustedIpResponse {
  trustedIp: TrustedIp;
}
