import { BaseResource } from "./base";
import type {
  CreateSecretSyncParams,
  CreateSecretSyncResponse,
  UpdateSecretSyncParams,
  UpdateSecretSyncResponse,
  DeleteSecretSyncParams,
  DeleteSecretSyncResponse,
  GetSecretSyncParams,
  GetSecretSyncResponse,
  ListSecretSyncsParams,
  ListSecretSyncsResponse,
  TriggerSecretSyncParams,
  TriggerSecretSyncResponse,
  ImportSecretSyncParams,
  ImportSecretSyncResponse,
  RemoveSecretSyncSecretsParams,
  RemoveSecretSyncSecretsResponse,
  GetSecretSyncByNameParams,
  GetSecretSyncByNameResponse,
} from "../types/secret-syncs";

export class SecretSyncsResource extends BaseResource {
  async create(params: CreateSecretSyncParams): Promise<CreateSecretSyncResponse> {
    const { destination, ...body } = params;
    return this.http.post<CreateSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(destination)}`,
      body
    );
  }

  async update(params: UpdateSecretSyncParams): Promise<UpdateSecretSyncResponse> {
    const { destination, syncId, ...body } = params;
    return this.http.patch<UpdateSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(destination)}/${encodeURIComponent(syncId)}`,
      body
    );
  }

  async delete(params: DeleteSecretSyncParams): Promise<DeleteSecretSyncResponse> {
    const { destination, syncId, ...body } = params;
    return this.http.delete<DeleteSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(destination)}/${encodeURIComponent(syncId)}`,
      body
    );
  }

  async get(params: GetSecretSyncParams): Promise<GetSecretSyncResponse> {
    return this.http.get<GetSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(params.destination)}/${encodeURIComponent(params.syncId)}`
    );
  }

  async list(params: ListSecretSyncsParams): Promise<ListSecretSyncsResponse> {
    const { destination, ...query } = params;
    return this.http.get<ListSecretSyncsResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(destination)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async trigger(params: TriggerSecretSyncParams): Promise<TriggerSecretSyncResponse> {
    return this.http.post<TriggerSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(params.destination)}/${encodeURIComponent(params.syncId)}/sync`
    );
  }

  async importSecrets(params: ImportSecretSyncParams): Promise<ImportSecretSyncResponse> {
    return this.http.post<ImportSecretSyncResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(params.destination)}/${encodeURIComponent(params.syncId)}/import-secrets`
    );
  }

  async removeSecrets(params: RemoveSecretSyncSecretsParams): Promise<RemoveSecretSyncSecretsResponse> {
    return this.http.post<RemoveSecretSyncSecretsResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(params.destination)}/${encodeURIComponent(params.syncId)}/remove-secrets`
    );
  }

  async getByName(params: GetSecretSyncByNameParams): Promise<GetSecretSyncByNameResponse> {
    return this.http.get<GetSecretSyncByNameResponse>(
      `/api/v1/secret-syncs/${encodeURIComponent(params.destination)}/sync-name/${encodeURIComponent(params.syncName)}`
    );
  }
}
