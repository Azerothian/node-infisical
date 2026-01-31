import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
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
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "secrets");
  }
  async getAccessList(params: GetSecretAccessListParams): Promise<GetSecretAccessListResponse> {
    this.requireAuth();
    const { secretName, ...query } = params;
    return this.http.get<GetSecretAccessListResponse>(
      `/api/v1/secrets/${encodeURIComponent(secretName)}/access-list`,
      { ...query } as Record<string, unknown>
    );
  }

  async list(params: ListSecretsParams): Promise<ListSecretsResponse> {
    this.requireAuth();
    return this.http.get<ListSecretsResponse>(
      "/api/v4/secrets",
      { ...params } as Record<string, unknown>
    );
  }

  async getByName(params: GetSecretByNameParams): Promise<GetSecretByNameResponse> {
    this.requireAuth();
    const { secretName, ...query } = params;
    return this.http.get<GetSecretByNameResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async getById(params: GetSecretByIdParams): Promise<GetSecretByIdResponse> {
    this.requireAuth();
    return this.http.get<GetSecretByIdResponse>(
      `/api/v4/secrets/id/${encodeURIComponent(params.secretId)}`
    );
  }

  async create(params: CreateSecretParams): Promise<CreateSecretResponse> {
    this.requireAuth();
    const { secretName, ...body } = params;
    return this.http.post<CreateSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async update(params: UpdateSecretParams): Promise<UpdateSecretResponse> {
    this.requireAuth();
    const { secretName, ...body } = params;
    return this.http.patch<UpdateSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async delete(params: DeleteSecretParams): Promise<DeleteSecretResponse> {
    this.requireAuth();
    const { secretName, ...body } = params;
    return this.http.delete<DeleteSecretResponse>(
      `/api/v4/secrets/${encodeURIComponent(secretName)}`,
      body
    );
  }

  async batchCreate(params: BatchCreateSecretsParams): Promise<BatchCreateSecretsResponse> {
    this.requireAuth();
    return this.http.post<BatchCreateSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async batchUpdate(params: BatchUpdateSecretsParams): Promise<BatchUpdateSecretsResponse> {
    this.requireAuth();
    return this.http.patch<BatchUpdateSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async batchDelete(params: BatchDeleteSecretsParams): Promise<BatchDeleteSecretsResponse> {
    this.requireAuth();
    return this.http.delete<BatchDeleteSecretsResponse>(
      "/api/v4/secrets/batch",
      params
    );
  }

  async move(params: MoveSecretsParams): Promise<MoveSecretsResponse> {
    this.requireAuth();
    return this.http.post<MoveSecretsResponse>(
      "/api/v4/secrets/move",
      params
    );
  }
}
