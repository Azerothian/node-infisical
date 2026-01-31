import { BaseResource } from "./base";
import type {
  CreateSshHostGroupParams,
  CreateSshHostGroupResponse,
  GetSshHostGroupParams,
  GetSshHostGroupResponse,
  UpdateSshHostGroupParams,
  UpdateSshHostGroupResponse,
  DeleteSshHostGroupParams,
  DeleteSshHostGroupResponse,
  ListSshHostGroupsParams,
  ListSshHostGroupsResponse,
} from "../types/ssh-host-groups";

export class SshHostGroupsResource extends BaseResource {
  async create(params: CreateSshHostGroupParams): Promise<CreateSshHostGroupResponse> {
    return this.http.post<CreateSshHostGroupResponse>(
      "/api/v1/ssh/host-groups",
      params
    );
  }

  async get(params: GetSshHostGroupParams): Promise<GetSshHostGroupResponse> {
    return this.http.get<GetSshHostGroupResponse>(
      `/api/v1/ssh/host-groups/${encodeURIComponent(params.hostGroupId)}`
    );
  }

  async update(params: UpdateSshHostGroupParams): Promise<UpdateSshHostGroupResponse> {
    const { hostGroupId, ...body } = params;
    return this.http.patch<UpdateSshHostGroupResponse>(
      `/api/v1/ssh/host-groups/${encodeURIComponent(hostGroupId)}`,
      body
    );
  }

  async delete(params: DeleteSshHostGroupParams): Promise<DeleteSshHostGroupResponse> {
    return this.http.delete<DeleteSshHostGroupResponse>(
      `/api/v1/ssh/host-groups/${encodeURIComponent(params.hostGroupId)}`
    );
  }

  async list(params: ListSshHostGroupsParams): Promise<ListSshHostGroupsResponse> {
    return this.http.get<ListSshHostGroupsResponse>(
      "/api/v1/ssh/host-groups",
      { ...params } as Record<string, unknown>
    );
  }
}
