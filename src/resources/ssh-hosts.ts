import { BaseResource } from "./base";
import type {
  CreateSshHostParams,
  CreateSshHostResponse,
  GetSshHostParams,
  GetSshHostResponse,
  UpdateSshHostParams,
  UpdateSshHostResponse,
  DeleteSshHostParams,
  DeleteSshHostResponse,
  ListSshHostsParams,
  ListSshHostsResponse,
} from "../types/ssh-hosts";

export class SshHostsResource extends BaseResource {
  async create(params: CreateSshHostParams): Promise<CreateSshHostResponse> {
    return this.http.post<CreateSshHostResponse>(
      "/api/v1/ssh/hosts",
      params
    );
  }

  async get(params: GetSshHostParams): Promise<GetSshHostResponse> {
    return this.http.get<GetSshHostResponse>(
      `/api/v1/ssh/hosts/${encodeURIComponent(params.hostId)}`
    );
  }

  async update(params: UpdateSshHostParams): Promise<UpdateSshHostResponse> {
    const { hostId, ...body } = params;
    return this.http.patch<UpdateSshHostResponse>(
      `/api/v1/ssh/hosts/${encodeURIComponent(hostId)}`,
      body
    );
  }

  async delete(params: DeleteSshHostParams): Promise<DeleteSshHostResponse> {
    return this.http.delete<DeleteSshHostResponse>(
      `/api/v1/ssh/hosts/${encodeURIComponent(params.hostId)}`
    );
  }

  async list(params: ListSshHostsParams): Promise<ListSshHostsResponse> {
    return this.http.get<ListSshHostsResponse>(
      "/api/v1/ssh/hosts",
      { ...params } as Record<string, unknown>
    );
  }
}
