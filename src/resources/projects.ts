import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
import type {
  GetProjectParams,
  GetProjectResponse,
  UpdateProjectParams,
  UpdateProjectResponse,
  DeleteProjectParams,
  DeleteProjectResponse,
  ListProjectMembershipsParams,
  ListProjectMembershipsResponse,
  ListProjectEnvironmentsParams,
  ListProjectEnvironmentsResponse,
  CreateProjectEnvironmentParams,
  CreateProjectEnvironmentResponse,
  UpdateProjectEnvironmentParams,
  UpdateProjectEnvironmentResponse,
  DeleteProjectEnvironmentParams,
  DeleteProjectEnvironmentResponse,
  ListProjectRolesParams,
  ListProjectRolesResponse,
  ListProjectTagsParams,
  ListProjectTagsResponse,
  CreateProjectParams,
  CreateProjectResponse,
  ListProjectsParams,
  ListProjectsResponse,
  GetProjectBySlugParams,
  GetProjectBySlugResponse,
} from "../types/projects";

export class ProjectsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "projects");
  }
  async create(params: CreateProjectParams): Promise<CreateProjectResponse> {
    this.requireAuth();
    return this.http.post<CreateProjectResponse>(
      "/api/v1/projects",
      params
    );
  }

  async list(params?: ListProjectsParams): Promise<ListProjectsResponse> {
    this.requireAuth();
    return this.http.get<ListProjectsResponse>(
      "/api/v1/projects",
      { ...params } as Record<string, unknown>
    );
  }

  async get(params: GetProjectParams): Promise<GetProjectResponse> {
    this.requireAuth();
    return this.http.get<GetProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}`
    );
  }

  async getBySlug(params: GetProjectBySlugParams): Promise<GetProjectBySlugResponse> {
    this.requireAuth();
    return this.http.get<GetProjectBySlugResponse>(
      `/api/v1/projects/slug/${encodeURIComponent(params.slug)}`
    );
  }

  async update(params: UpdateProjectParams): Promise<UpdateProjectResponse> {
    this.requireAuth();
    const { projectId, ...body } = params;
    return this.http.patch<UpdateProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}`,
      body
    );
  }

  async delete(params: DeleteProjectParams): Promise<DeleteProjectResponse> {
    this.requireAuth();
    return this.http.delete<DeleteProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}`
    );
  }

  async listMemberships(params: ListProjectMembershipsParams): Promise<ListProjectMembershipsResponse> {
    this.requireAuth();
    return this.http.get<ListProjectMembershipsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/memberships`
    );
  }

  async listEnvironments(params: ListProjectEnvironmentsParams): Promise<ListProjectEnvironmentsResponse> {
    this.requireAuth();
    return this.http.get<ListProjectEnvironmentsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/environments`
    );
  }

  async createEnvironment(params: CreateProjectEnvironmentParams): Promise<CreateProjectEnvironmentResponse> {
    this.requireAuth();
    const { projectId, ...body } = params;
    return this.http.post<CreateProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/environments`,
      body
    );
  }

  async updateEnvironment(params: UpdateProjectEnvironmentParams): Promise<UpdateProjectEnvironmentResponse> {
    this.requireAuth();
    const { projectId, environmentId, ...body } = params;
    return this.http.patch<UpdateProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/environments/${encodeURIComponent(environmentId)}`,
      body
    );
  }

  async deleteEnvironment(params: DeleteProjectEnvironmentParams): Promise<DeleteProjectEnvironmentResponse> {
    this.requireAuth();
    return this.http.delete<DeleteProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/environments/${encodeURIComponent(params.environmentId)}`
    );
  }

  async listRoles(params: ListProjectRolesParams): Promise<ListProjectRolesResponse> {
    this.requireAuth();
    return this.http.get<ListProjectRolesResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/roles`
    );
  }

  async listTags(params: ListProjectTagsParams): Promise<ListProjectTagsResponse> {
    this.requireAuth();
    return this.http.get<ListProjectTagsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/tags`
    );
  }

}
