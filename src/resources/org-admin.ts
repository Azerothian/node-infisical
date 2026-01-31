import { BaseResource } from "./base";
import type {
  ListOrgAdminProjectsParams,
  ListOrgAdminProjectsResponse,
  GrantOrgAdminProjectAccessParams,
  GrantOrgAdminProjectAccessResponse,
} from "../types/org-admin";

export class OrgAdminResource extends BaseResource {
  async listProjects(params?: ListOrgAdminProjectsParams): Promise<ListOrgAdminProjectsResponse> {
    return this.http.get<ListOrgAdminProjectsResponse>(
      "/api/v1/org-admin/projects",
      { ...params } as Record<string, unknown>
    );
  }

  async grantProjectAccess(params: GrantOrgAdminProjectAccessParams): Promise<GrantOrgAdminProjectAccessResponse> {
    return this.http.post<GrantOrgAdminProjectAccessResponse>(
      `/api/v1/org-admin/projects/${encodeURIComponent(params.projectId)}/grant-admin-access`
    );
  }
}
