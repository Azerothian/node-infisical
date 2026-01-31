import { BaseResource } from "./base";
import type {
  CreateIdentityParams,
  CreateIdentityResponse,
  UpdateIdentityParams,
  UpdateIdentityResponse,
  DeleteIdentityParams,
  DeleteIdentityResponse,
  GetIdentityParams,
  GetIdentityResponse,
  ListIdentityProjectMembershipsParams,
  ListIdentityProjectMembershipsResponse,
  SearchIdentitiesParams,
  SearchIdentitiesResponse,
} from "../types/identities";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentitiesResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identities");
  }

  async create(params: CreateIdentityParams): Promise<CreateIdentityResponse> {
    this.requireAuth();
    return this.http.post<CreateIdentityResponse>(
      "/api/v1/identities",
      params
    );
  }

  async update(params: UpdateIdentityParams): Promise<UpdateIdentityResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateIdentityResponse>(
      `/api/v1/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async delete(params: DeleteIdentityParams): Promise<DeleteIdentityResponse> {
    this.requireAuth();
    return this.http.delete<DeleteIdentityResponse>(
      `/api/v1/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async get(params: GetIdentityParams): Promise<GetIdentityResponse> {
    this.requireAuth();
    return this.http.get<GetIdentityResponse>(
      `/api/v1/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async listProjectMemberships(
    params: ListIdentityProjectMembershipsParams
  ): Promise<ListIdentityProjectMembershipsResponse> {
    this.requireAuth();
    return this.http.get<ListIdentityProjectMembershipsResponse>(
      `/api/v1/identities/${encodeURIComponent(params.identityId)}/identity-memberships`
    );
  }

  async search(params: SearchIdentitiesParams): Promise<SearchIdentitiesResponse> {
    this.requireAuth();
    const { organizationId, ...query } = params;
    return this.http.get<SearchIdentitiesResponse>(
      `/api/v1/organizations/${encodeURIComponent(organizationId)}/identities`,
      { ...query } as Record<string, unknown>
    );
  }
}
