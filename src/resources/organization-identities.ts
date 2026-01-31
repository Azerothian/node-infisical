import { BaseResource } from "./base";
import type {
  ListIdentityMembershipsParams,
  ListIdentityMembershipsResponse,
} from "../types/organization-identities";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class OrganizationIdentitiesResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "organizationIdentities");
  }

  async list(
    params: ListIdentityMembershipsParams
  ): Promise<ListIdentityMembershipsResponse> {
    this.requireAuth();
    const { orgId, ...query } = params;
    return this.http.get<ListIdentityMembershipsResponse>(
      `/organizations/${encodeURIComponent(orgId)}/identity-memberships`,
      { ...query } as Record<string, unknown>
    );
  }
}
