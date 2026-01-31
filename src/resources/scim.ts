import { BaseResource } from "./base";
import type {
  CreateScimTokenParams,
  CreateScimTokenResponse,
  ListScimTokensParams,
  ListScimTokensResponse,
  DeleteScimTokenParams,
  DeleteScimTokenResponse,
  ListScimEventsParams,
  ListScimEventsResponse,
  ListScimUsersParams,
  ListScimUsersResponse,
  GetScimUserParams,
  GetScimUserResponse,
  CreateScimUserParams,
  CreateScimUserResponse,
  ReplaceScimUserParams,
  ReplaceScimUserResponse,
  UpdateScimUserParams,
  UpdateScimUserResponse,
  DeleteScimUserParams,
  CreateScimGroupParams,
  CreateScimGroupResponse,
  ListScimGroupsParams,
  ListScimGroupsResponse,
  GetScimGroupParams,
  GetScimGroupResponse,
  ReplaceScimGroupParams,
  ReplaceScimGroupResponse,
  UpdateScimGroupParams,
  UpdateScimGroupResponse,
  DeleteScimGroupParams,
} from "../types/scim";

export class ScimResource extends BaseResource {
  // Token management
  async createToken(params: CreateScimTokenParams): Promise<CreateScimTokenResponse> {
    return this.http.post<CreateScimTokenResponse>(
      "/api/v1/scim/scim-tokens",
      params
    );
  }

  async listTokens(params: ListScimTokensParams): Promise<ListScimTokensResponse> {
    return this.http.get<ListScimTokensResponse>(
      "/api/v1/scim/scim-tokens",
      { ...params } as Record<string, unknown>
    );
  }

  async deleteToken(params: DeleteScimTokenParams): Promise<DeleteScimTokenResponse> {
    return this.http.delete<DeleteScimTokenResponse>(
      `/api/v1/scim/scim-tokens/${encodeURIComponent(params.scimTokenId)}`
    );
  }

  async listEvents(params?: ListScimEventsParams): Promise<ListScimEventsResponse> {
    return this.http.get<ListScimEventsResponse>(
      "/api/v1/scim/scim-events",
      { ...params } as Record<string, unknown>
    );
  }

  // SCIM 2.0 Users
  async listUsers(params?: ListScimUsersParams): Promise<ListScimUsersResponse> {
    return this.http.get<ListScimUsersResponse>(
      "/api/v1/scim/Users",
      { ...params } as Record<string, unknown>
    );
  }

  async getUser(params: GetScimUserParams): Promise<GetScimUserResponse> {
    return this.http.get<GetScimUserResponse>(
      `/api/v1/scim/Users/${encodeURIComponent(params.orgMembershipId)}`
    );
  }

  async createUser(params: CreateScimUserParams): Promise<CreateScimUserResponse> {
    return this.http.post<CreateScimUserResponse>(
      "/api/v1/scim/Users",
      params
    );
  }

  async replaceUser(params: ReplaceScimUserParams): Promise<ReplaceScimUserResponse> {
    const { orgMembershipId, ...body } = params;
    return this.http.put<ReplaceScimUserResponse>(
      `/api/v1/scim/Users/${encodeURIComponent(orgMembershipId)}`,
      body
    );
  }

  async updateUser(params: UpdateScimUserParams): Promise<UpdateScimUserResponse> {
    const { orgMembershipId, ...body } = params;
    return this.http.patch<UpdateScimUserResponse>(
      `/api/v1/scim/Users/${encodeURIComponent(orgMembershipId)}`,
      body
    );
  }

  async deleteUser(params: DeleteScimUserParams): Promise<void> {
    await this.http.delete<Record<string, never>>(
      `/api/v1/scim/Users/${encodeURIComponent(params.orgMembershipId)}`
    );
  }

  // SCIM 2.0 Groups
  async createGroup(params: CreateScimGroupParams): Promise<CreateScimGroupResponse> {
    return this.http.post<CreateScimGroupResponse>(
      "/api/v1/scim/Groups",
      params
    );
  }

  async listGroups(params?: ListScimGroupsParams): Promise<ListScimGroupsResponse> {
    return this.http.get<ListScimGroupsResponse>(
      "/api/v1/scim/Groups",
      { ...params } as Record<string, unknown>
    );
  }

  async getGroup(params: GetScimGroupParams): Promise<GetScimGroupResponse> {
    return this.http.get<GetScimGroupResponse>(
      `/api/v1/scim/Groups/${encodeURIComponent(params.groupId)}`
    );
  }

  async replaceGroup(params: ReplaceScimGroupParams): Promise<ReplaceScimGroupResponse> {
    const { groupId, ...body } = params;
    return this.http.put<ReplaceScimGroupResponse>(
      `/api/v1/scim/Groups/${encodeURIComponent(groupId)}`,
      body
    );
  }

  async updateGroup(params: UpdateScimGroupParams): Promise<UpdateScimGroupResponse> {
    const { groupId, ...body } = params;
    return this.http.patch<UpdateScimGroupResponse>(
      `/api/v1/scim/Groups/${encodeURIComponent(groupId)}`,
      body
    );
  }

  async deleteGroup(params: DeleteScimGroupParams): Promise<void> {
    await this.http.delete<Record<string, never>>(
      `/api/v1/scim/Groups/${encodeURIComponent(params.groupId)}`
    );
  }
}
