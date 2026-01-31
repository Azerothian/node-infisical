import { BaseResource } from "./base";
import type {
  ListOrgAdminProjectsParams,
  ListOrgAdminProjectsResponse,
  GrantOrgAdminProjectAccessParams,
  GrantOrgAdminProjectAccessResponse,
} from "../types/org-admin";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class OrgAdminResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "orgAdmin");
  }
  async listProjects(params?: ListOrgAdminProjectsParams): Promise<ListOrgAdminProjectsResponse> {
    this.requireAuth();
    return this.http.get<ListOrgAdminProjectsResponse>(
      "/api/v1/org-admin/projects",
      { ...params } as Record<string, unknown>
    );
  }

  async grantProjectAccess(params: GrantOrgAdminProjectAccessParams): Promise<GrantOrgAdminProjectAccessResponse> {
    this.requireAuth();
    return this.http.post<GrantOrgAdminProjectAccessResponse>(
      `/api/v1/org-admin/projects/${encodeURIComponent(params.projectId)}/grant-admin-access`
    );
  }
}
