export interface ListOrgAdminProjectsParams {
  search?: string;
  offset?: number;
  limit?: number;
}

export interface ListOrgAdminProjectsResponse {
  projects: Record<string, unknown>[];
  count: number;
}

export interface GrantOrgAdminProjectAccessParams {
  projectId: string;
}

export interface GrantOrgAdminProjectAccessResponse {
  membership: Record<string, unknown>;
}
