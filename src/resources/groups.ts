import { BaseResource } from "./base";
import type {
  CreateGroupParams,
  CreateGroupResponse,
  UpdateGroupParams,
  UpdateGroupResponse,
  DeleteGroupParams,
  DeleteGroupResponse,
  GetGroupParams,
  GetGroupResponse,
  ListGroupUsersParams,
  ListGroupUsersResponse,
  AddUserToGroupParams,
  AddUserToGroupResponse,
  RemoveUserFromGroupParams,
  RemoveUserFromGroupResponse,
} from "../types/groups";

export class GroupsResource extends BaseResource {
  async create(params: CreateGroupParams): Promise<CreateGroupResponse> {
    return this.http.post<CreateGroupResponse>(
      "/api/v1/groups",
      params
    );
  }

  async update(params: UpdateGroupParams): Promise<UpdateGroupResponse> {
    const { groupId, ...body } = params;
    return this.http.patch<UpdateGroupResponse>(
      `/api/v1/groups/${encodeURIComponent(groupId)}`,
      body
    );
  }

  async delete(params: DeleteGroupParams): Promise<DeleteGroupResponse> {
    return this.http.delete<DeleteGroupResponse>(
      `/api/v1/groups/${encodeURIComponent(params.groupId)}`
    );
  }

  async get(params: GetGroupParams): Promise<GetGroupResponse> {
    return this.http.get<GetGroupResponse>(
      `/api/v1/groups/${encodeURIComponent(params.groupId)}`
    );
  }

  async listUsers(params: ListGroupUsersParams): Promise<ListGroupUsersResponse> {
    const { groupId, ...query } = params;
    return this.http.get<ListGroupUsersResponse>(
      `/api/v1/groups/${encodeURIComponent(groupId)}/users`,
      { ...query } as Record<string, unknown>
    );
  }

  async addUser(params: AddUserToGroupParams): Promise<AddUserToGroupResponse> {
    const { groupId, ...body } = params;
    return this.http.post<AddUserToGroupResponse>(
      `/api/v1/groups/${encodeURIComponent(groupId)}/users`,
      body
    );
  }

  async removeUser(params: RemoveUserFromGroupParams): Promise<RemoveUserFromGroupResponse> {
    const { groupId, username } = params;
    return this.http.delete<RemoveUserFromGroupResponse>(
      `/api/v1/groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(username)}`
    );
  }
}
