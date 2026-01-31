import { BaseResource } from "./base";
import type {
  CreateSecretFolderParams,
  CreateSecretFolderResponse,
  UpdateSecretFolderParams,
  UpdateSecretFolderResponse,
  UpdateSecretFolderBatchParams,
  UpdateSecretFolderBatchResponse,
  DeleteSecretFolderParams,
  DeleteSecretFolderResponse,
  ListSecretFoldersParams,
  ListSecretFoldersResponse,
  GetSecretFolderByIdParams,
  GetSecretFolderByIdResponse,
} from "../types/secret-folders";

export class SecretFoldersResource extends BaseResource {
  async create(
    params: CreateSecretFolderParams
  ): Promise<CreateSecretFolderResponse> {
    return this.http.post<CreateSecretFolderResponse>("/folders", params);
  }

  async update(
    params: UpdateSecretFolderParams
  ): Promise<UpdateSecretFolderResponse> {
    const { folderId, ...body } = params;
    return this.http.patch<UpdateSecretFolderResponse>(
      `/folders/${encodeURIComponent(folderId)}`,
      body
    );
  }

  async updateBatch(
    params: UpdateSecretFolderBatchParams
  ): Promise<UpdateSecretFolderBatchResponse> {
    return this.http.patch<UpdateSecretFolderBatchResponse>(
      "/folders/batch",
      params
    );
  }

  async delete(
    params: DeleteSecretFolderParams
  ): Promise<DeleteSecretFolderResponse> {
    const { folderIdOrName, ...body } = params;
    return this.http.delete<DeleteSecretFolderResponse>(
      `/folders/${encodeURIComponent(folderIdOrName)}`,
      body
    );
  }

  async list(
    params: ListSecretFoldersParams
  ): Promise<ListSecretFoldersResponse> {
    return this.http.get<ListSecretFoldersResponse>(
      "/folders",
      { ...params } as Record<string, unknown>
    );
  }

  async getById(
    params: GetSecretFolderByIdParams
  ): Promise<GetSecretFolderByIdResponse> {
    return this.http.get<GetSecretFolderByIdResponse>(
      `/folders/${encodeURIComponent(params.id)}`
    );
  }
}
