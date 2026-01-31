import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
import type {
  ListMembershipsParams,
  ListMembershipsResponse,
  ListOrgProjectsParams,
  ListOrgProjectsResponse,
  GetMembershipParams,
  GetMembershipResponse,
  UpdateMembershipParams,
  UpdateMembershipResponse,
  DeleteMembershipParams,
  DeleteMembershipResponse,
  BulkDeleteMembershipsParams,
  BulkDeleteMembershipsResponse,
  ListProjectMembershipsByOrgMembershipParams,
  ListProjectMembershipsByOrgMembershipResponse,
  CreateOrganizationParams,
  CreateOrganizationResponse,
  DeleteOrganizationParams,
  DeleteOrganizationResponse,
  UpgradePrivilegeSystemResponse,
} from "../types/organizations";

export class OrganizationsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "organizations");
  }
  async listMemberships(
    params: ListMembershipsParams
  ): Promise<ListMembershipsResponse> {
    this.requireAuth();
    return this.http.get<ListMembershipsResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships`
    );
  }

  async listProjects(
    params: ListOrgProjectsParams
  ): Promise<ListOrgProjectsResponse> {
    this.requireAuth();
    return this.http.get<ListOrgProjectsResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/workspaces`
    );
  }

  async getMembership(
    params: GetMembershipParams
  ): Promise<GetMembershipResponse> {
    this.requireAuth();
    return this.http.get<GetMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}`
    );
  }

  async updateMembership(
    params: UpdateMembershipParams
  ): Promise<UpdateMembershipResponse> {
    this.requireAuth();
    const { orgId, membershipId, ...body } = params;
    return this.http.patch<UpdateMembershipResponse>(
      `/organizations/${encodeURIComponent(orgId)}/memberships/${encodeURIComponent(membershipId)}`,
      body
    );
  }

  async deleteMembership(
    params: DeleteMembershipParams
  ): Promise<DeleteMembershipResponse> {
    this.requireAuth();
    return this.http.delete<DeleteMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}`
    );
  }

  async bulkDeleteMemberships(
    params: BulkDeleteMembershipsParams
  ): Promise<BulkDeleteMembershipsResponse> {
    this.requireAuth();
    const { orgId, ...body } = params;
    return this.http.delete<BulkDeleteMembershipsResponse>(
      `/organizations/${encodeURIComponent(orgId)}/memberships`,
      body
    );
  }

  async listProjectMembershipsByOrgMembership(
    params: ListProjectMembershipsByOrgMembershipParams
  ): Promise<ListProjectMembershipsByOrgMembershipResponse> {
    this.requireAuth();
    return this.http.get<ListProjectMembershipsByOrgMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}/project-memberships`
    );
  }

  async create(
    params: CreateOrganizationParams
  ): Promise<CreateOrganizationResponse> {
    this.requireAuth();
    return this.http.post<CreateOrganizationResponse>(
      "/organizations",
      params
    );
  }

  async delete(
    params: DeleteOrganizationParams
  ): Promise<DeleteOrganizationResponse> {
    this.requireAuth();
    return this.http.delete<DeleteOrganizationResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}`
    );
  }

  async upgradePrivilegeSystem(): Promise<UpgradePrivilegeSystemResponse> {
    this.requireAuth();
    return this.http.post<UpgradePrivilegeSystemResponse>(
      "/organizations/privilege-system-upgrade"
    );
  }
}
