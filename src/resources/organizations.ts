import { BaseResource } from "./base";
import type {
  ListMembershipsParams,
  ListMembershipsResponse,
  ListProjectsParams,
  ListProjectsResponse,
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
  async listMemberships(
    params: ListMembershipsParams
  ): Promise<ListMembershipsResponse> {
    return this.http.get<ListMembershipsResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships`
    );
  }

  async listProjects(
    params: ListProjectsParams
  ): Promise<ListProjectsResponse> {
    return this.http.get<ListProjectsResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/workspaces`
    );
  }

  async getMembership(
    params: GetMembershipParams
  ): Promise<GetMembershipResponse> {
    return this.http.get<GetMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}`
    );
  }

  async updateMembership(
    params: UpdateMembershipParams
  ): Promise<UpdateMembershipResponse> {
    const { orgId, membershipId, ...body } = params;
    return this.http.patch<UpdateMembershipResponse>(
      `/organizations/${encodeURIComponent(orgId)}/memberships/${encodeURIComponent(membershipId)}`,
      body
    );
  }

  async deleteMembership(
    params: DeleteMembershipParams
  ): Promise<DeleteMembershipResponse> {
    return this.http.delete<DeleteMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}`
    );
  }

  async bulkDeleteMemberships(
    params: BulkDeleteMembershipsParams
  ): Promise<BulkDeleteMembershipsResponse> {
    const { orgId, ...body } = params;
    return this.http.delete<BulkDeleteMembershipsResponse>(
      `/organizations/${encodeURIComponent(orgId)}/memberships`,
      body
    );
  }

  async listProjectMembershipsByOrgMembership(
    params: ListProjectMembershipsByOrgMembershipParams
  ): Promise<ListProjectMembershipsByOrgMembershipResponse> {
    return this.http.get<ListProjectMembershipsByOrgMembershipResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}/memberships/${encodeURIComponent(params.membershipId)}/project-memberships`
    );
  }

  async create(
    params: CreateOrganizationParams
  ): Promise<CreateOrganizationResponse> {
    return this.http.post<CreateOrganizationResponse>(
      "/organizations",
      params
    );
  }

  async delete(
    params: DeleteOrganizationParams
  ): Promise<DeleteOrganizationResponse> {
    return this.http.delete<DeleteOrganizationResponse>(
      `/organizations/${encodeURIComponent(params.orgId)}`
    );
  }

  async upgradePrivilegeSystem(): Promise<UpgradePrivilegeSystemResponse> {
    return this.http.post<UpgradePrivilegeSystemResponse>(
      "/organizations/privilege-system-upgrade"
    );
  }
}
