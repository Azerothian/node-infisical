import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
import type {
  CreateSecretImportParams,
  CreateSecretImportResponse,
  UpdateSecretImportParams,
  UpdateSecretImportResponse,
  DeleteSecretImportParams,
  DeleteSecretImportResponse,
  ResyncReplicationParams,
  ResyncReplicationResponse,
  ListSecretImportsParams,
  ListSecretImportsResponse,
  GetSecretImportParams,
  GetSecretImportResponse,
  GetRawSecretsFromImportsParams,
  GetRawSecretsFromImportsResponse,
} from "../types/secret-imports";

export class SecretImportsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "secretImports");
  }
  async create(
    params: CreateSecretImportParams
  ): Promise<CreateSecretImportResponse> {
    this.requireAuth();
    return this.http.post<CreateSecretImportResponse>(
      "/secret-imports",
      params
    );
  }

  async update(
    params: UpdateSecretImportParams
  ): Promise<UpdateSecretImportResponse> {
    this.requireAuth();
    const { secretImportId, ...body } = params;
    return this.http.patch<UpdateSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}`,
      body
    );
  }

  async delete(
    params: DeleteSecretImportParams
  ): Promise<DeleteSecretImportResponse> {
    this.requireAuth();
    const { secretImportId, ...body } = params;
    return this.http.delete<DeleteSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}`,
      body
    );
  }

  async resyncReplication(
    params: ResyncReplicationParams
  ): Promise<ResyncReplicationResponse> {
    this.requireAuth();
    const { secretImportId, ...body } = params;
    return this.http.post<ResyncReplicationResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}/replication-resync`,
      body
    );
  }

  async list(
    params: ListSecretImportsParams
  ): Promise<ListSecretImportsResponse> {
    this.requireAuth();
    return this.http.get<ListSecretImportsResponse>(
      "/secret-imports",
      { ...params } as Record<string, unknown>
    );
  }

  async get(
    params: GetSecretImportParams
  ): Promise<GetSecretImportResponse> {
    this.requireAuth();
    return this.http.get<GetSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(params.secretImportId)}`
    );
  }

  async getRawSecrets(
    params: GetRawSecretsFromImportsParams
  ): Promise<GetRawSecretsFromImportsResponse> {
    this.requireAuth();
    return this.http.get<GetRawSecretsFromImportsResponse>(
      "/secret-imports/secrets",
      { ...params } as Record<string, unknown>
    );
  }
}
