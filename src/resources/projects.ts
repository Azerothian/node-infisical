import { BaseResource } from "./base";
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
  ListTrustedIpsParams,
  ListTrustedIpsResponse,
  CreateTrustedIpParams,
  CreateTrustedIpResponse,
  UpdateTrustedIpParams,
  UpdateTrustedIpResponse,
  DeleteTrustedIpParams,
  DeleteTrustedIpResponse,
} from "../types/projects";

export class ProjectsResource extends BaseResource {
  async get(params: GetProjectParams): Promise<GetProjectResponse> {
    return this.http.get<GetProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}`
    );
  }

  async update(params: UpdateProjectParams): Promise<UpdateProjectResponse> {
    const { projectId, ...body } = params;
    return this.http.patch<UpdateProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}`,
      body
    );
  }

  async delete(params: DeleteProjectParams): Promise<DeleteProjectResponse> {
    return this.http.delete<DeleteProjectResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}`
    );
  }

  async listMemberships(params: ListProjectMembershipsParams): Promise<ListProjectMembershipsResponse> {
    return this.http.get<ListProjectMembershipsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/memberships`
    );
  }

  async listEnvironments(params: ListProjectEnvironmentsParams): Promise<ListProjectEnvironmentsResponse> {
    return this.http.get<ListProjectEnvironmentsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/environments`
    );
  }

  async createEnvironment(params: CreateProjectEnvironmentParams): Promise<CreateProjectEnvironmentResponse> {
    const { projectId, ...body } = params;
    return this.http.post<CreateProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/environments`,
      body
    );
  }

  async updateEnvironment(params: UpdateProjectEnvironmentParams): Promise<UpdateProjectEnvironmentResponse> {
    const { projectId, environmentId, ...body } = params;
    return this.http.patch<UpdateProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/environments/${encodeURIComponent(environmentId)}`,
      body
    );
  }

  async deleteEnvironment(params: DeleteProjectEnvironmentParams): Promise<DeleteProjectEnvironmentResponse> {
    return this.http.delete<DeleteProjectEnvironmentResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/environments/${encodeURIComponent(params.environmentId)}`
    );
  }

  async listRoles(params: ListProjectRolesParams): Promise<ListProjectRolesResponse> {
    return this.http.get<ListProjectRolesResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/roles`
    );
  }

  async listTags(params: ListProjectTagsParams): Promise<ListProjectTagsResponse> {
    return this.http.get<ListProjectTagsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/tags`
    );
  }

  async listTrustedIps(params: ListTrustedIpsParams): Promise<ListTrustedIpsResponse> {
    return this.http.get<ListTrustedIpsResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/trusted-ips`
    );
  }

  async createTrustedIp(params: CreateTrustedIpParams): Promise<CreateTrustedIpResponse> {
    const { projectId, ...body } = params;
    return this.http.post<CreateTrustedIpResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/trusted-ips`,
      body
    );
  }

  async updateTrustedIp(params: UpdateTrustedIpParams): Promise<UpdateTrustedIpResponse> {
    const { projectId, trustedIpId, ...body } = params;
    return this.http.patch<UpdateTrustedIpResponse>(
      `/api/v1/workspace/${encodeURIComponent(projectId)}/trusted-ips/${encodeURIComponent(trustedIpId)}`,
      body
    );
  }

  async deleteTrustedIp(params: DeleteTrustedIpParams): Promise<DeleteTrustedIpResponse> {
    return this.http.delete<DeleteTrustedIpResponse>(
      `/api/v1/workspace/${encodeURIComponent(params.projectId)}/trusted-ips/${encodeURIComponent(params.trustedIpId)}`
    );
  }
}
