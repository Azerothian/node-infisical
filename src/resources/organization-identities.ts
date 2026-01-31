import { BaseResource } from "./base";
import type {
  ListIdentityMembershipsParams,
  ListIdentityMembershipsResponse,
} from "../types/organization-identities";

export class OrganizationIdentitiesResource extends BaseResource {
  async list(
    params: ListIdentityMembershipsParams
  ): Promise<ListIdentityMembershipsResponse> {
    const { orgId, ...query } = params;
    return this.http.get<ListIdentityMembershipsResponse>(
      `/organizations/${encodeURIComponent(orgId)}/identity-memberships`,
      { ...query } as Record<string, unknown>
    );
  }
}
