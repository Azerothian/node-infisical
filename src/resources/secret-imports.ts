import { BaseResource } from "./base";
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
  async create(
    params: CreateSecretImportParams
  ): Promise<CreateSecretImportResponse> {
    return this.http.post<CreateSecretImportResponse>(
      "/secret-imports",
      params
    );
  }

  async update(
    params: UpdateSecretImportParams
  ): Promise<UpdateSecretImportResponse> {
    const { secretImportId, ...body } = params;
    return this.http.patch<UpdateSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}`,
      body
    );
  }

  async delete(
    params: DeleteSecretImportParams
  ): Promise<DeleteSecretImportResponse> {
    const { secretImportId, ...body } = params;
    return this.http.delete<DeleteSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}`,
      body
    );
  }

  async resyncReplication(
    params: ResyncReplicationParams
  ): Promise<ResyncReplicationResponse> {
    const { secretImportId, ...body } = params;
    return this.http.post<ResyncReplicationResponse>(
      `/secret-imports/${encodeURIComponent(secretImportId)}/replication-resync`,
      body
    );
  }

  async list(
    params: ListSecretImportsParams
  ): Promise<ListSecretImportsResponse> {
    return this.http.get<ListSecretImportsResponse>(
      "/secret-imports",
      { ...params } as Record<string, unknown>
    );
  }

  async get(
    params: GetSecretImportParams
  ): Promise<GetSecretImportResponse> {
    return this.http.get<GetSecretImportResponse>(
      `/secret-imports/${encodeURIComponent(params.secretImportId)}`
    );
  }

  async getRawSecrets(
    params: GetRawSecretsFromImportsParams
  ): Promise<GetRawSecretsFromImportsResponse> {
    return this.http.get<GetRawSecretsFromImportsResponse>(
      "/secret-imports/secrets",
      { ...params } as Record<string, unknown>
    );
  }
}
