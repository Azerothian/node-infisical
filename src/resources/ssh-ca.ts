import { BaseResource } from "./base";
import type {
  CreateSshCaParams,
  CreateSshCaResponse,
  GetSshCaParams,
  GetSshCaResponse,
  UpdateSshCaParams,
  UpdateSshCaResponse,
  DeleteSshCaParams,
  DeleteSshCaResponse,
  ListSshCasParams,
  ListSshCasResponse,
  GetSshCaPublicKeyParams,
  GetSshCaPublicKeyResponse,
} from "../types/ssh-ca";

export class SshCaResource extends BaseResource {
  async create(params: CreateSshCaParams): Promise<CreateSshCaResponse> {
    return this.http.post<CreateSshCaResponse>(
      "/api/v1/ssh/ca",
      params
    );
  }

  async get(params: GetSshCaParams): Promise<GetSshCaResponse> {
    return this.http.get<GetSshCaResponse>(
      `/api/v1/ssh/ca/${encodeURIComponent(params.caId)}`
    );
  }

  async update(params: UpdateSshCaParams): Promise<UpdateSshCaResponse> {
    const { caId, ...body } = params;
    return this.http.patch<UpdateSshCaResponse>(
      `/api/v1/ssh/ca/${encodeURIComponent(caId)}`,
      body
    );
  }

  async delete(params: DeleteSshCaParams): Promise<DeleteSshCaResponse> {
    return this.http.delete<DeleteSshCaResponse>(
      `/api/v1/ssh/ca/${encodeURIComponent(params.caId)}`
    );
  }

  async list(params: ListSshCasParams): Promise<ListSshCasResponse> {
    return this.http.get<ListSshCasResponse>(
      "/api/v1/ssh/ca",
      { ...params } as Record<string, unknown>
    );
  }

  async getPublicKey(params: GetSshCaPublicKeyParams): Promise<GetSshCaPublicKeyResponse> {
    return this.http.get<GetSshCaPublicKeyResponse>(
      `/api/v1/ssh/ca/${encodeURIComponent(params.caId)}/public-key`
    );
  }
}
