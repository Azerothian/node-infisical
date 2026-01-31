import { BaseResource } from "./base";
import type {
  GetSecretAccessListParams,
  GetSecretAccessListResponse,
  ListSecretsParams,
  ListSecretsResponse,
  GetSecretByNameParams,
  GetSecretByNameResponse,
  GetSecretByIdParams,
  GetSecretByIdResponse,
  CreateSecretParams,
  CreateSecretResponse,
  UpdateSecretParams,
  UpdateSecretResponse,
  DeleteSecretParams,
  DeleteSecretResponse,
  BatchCreateSecretsParams,
  BatchCreateSecretsResponse,
  BatchUpdateSecretsParams,
  BatchUpdateSecretsResponse,
  BatchDeleteSecretsParams,
  BatchDeleteSecretsResponse,
  MoveSecretsParams,
  MoveSecretsResponse,
} from "../types/secrets";

export class SecretsResource extends BaseResource {
  async getAccessList(params: GetSecretAccessListParams): Promise<GetSecretAccessListResponse> {
    const { secretName, ...query } = params;
    return this.http.get<GetSecretAccessListResponse>(
      `/api/v1/secrets/${encodeURIComponent(secretName)}/access-list`,
      { ...query } as Record<string, unknown>
    );
  }

  async list(params: ListSecretsParams): Promise<ListSecretsResponse> {
    return this.http.get<ListSecretsResponse>(
      "/api/v4/secrets",
      { ...params } as Record<string, unknown>
    );
  }

  async getByName(params: GetSecretByNameParams): Promise<GetSecretByNameResponse> {
    const { secretName, ...query } = params;
    return this.http.get<GetSecretByNameResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async getById(params: GetSecretByIdParams): Promise<GetSecretByIdResponse> {
    return this.http.get<GetSecretByIdResponse>(
      `/api/v4/secrets/id/${encodeURIComponent(params.secretId)}`
    );
  }

  async create(params: CreateSecretParams): Promise<CreateSecretResponse> {
    const { secretName, ...body } = params;
    return this.http.post<CreateSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async update(params: UpdateSecretParams): Promise<UpdateSecretResponse> {
    const { secretName, ...body } = params;
    return this.http.patch<UpdateSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async delete(params: DeleteSecretParams): Promise<DeleteSecretResponse> {
    const { secretName, ...body } = params;
    return this.http.delete<DeleteSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async batchCreate(params: BatchCreateSecretsParams): Promise<BatchCreateSecretsResponse> {
    return this.http.post<BatchCreateSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async batchUpdate(params: BatchUpdateSecretsParams): Promise<BatchUpdateSecretsResponse> {
    return this.http.patch<BatchUpdateSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async batchDelete(params: BatchDeleteSecretsParams): Promise<BatchDeleteSecretsResponse> {
    return this.http.delete<BatchDeleteSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async move(params: MoveSecretsParams): Promise<MoveSecretsResponse> {
    return this.http.post<MoveSecretsResponse>(
      "/api/v4/secrets/move",
      params
    );
  }
}
