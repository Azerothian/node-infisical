import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
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
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "secretFolders");
  }
  async create(
    params: CreateSecretFolderParams
  ): Promise<CreateSecretFolderResponse> {
    this.requireAuth();
    return this.http.post<CreateSecretFolderResponse>("/folders", params);
  }

  async update(
    params: UpdateSecretFolderParams
  ): Promise<UpdateSecretFolderResponse> {
    this.requireAuth();
    const { folderId, ...body } = params;
    return this.http.patch<UpdateSecretFolderResponse>(
      `/folders/${encodeURIComponent(folderId)}`,
      body
    );
  }

  async updateBatch(
    params: UpdateSecretFolderBatchParams
  ): Promise<UpdateSecretFolderBatchResponse> {
    this.requireAuth();
    return this.http.patch<UpdateSecretFolderBatchResponse>(
      "/folders/batch",
      params
    );
  }

  async delete(
    params: DeleteSecretFolderParams
  ): Promise<DeleteSecretFolderResponse> {
    this.requireAuth();
    const { folderIdOrName, ...body } = params;
    return this.http.delete<DeleteSecretFolderResponse>(
      `/folders/${encodeURIComponent(folderIdOrName)}`,
      body
    );
  }

  async list(
    params: ListSecretFoldersParams
  ): Promise<ListSecretFoldersResponse> {
    this.requireAuth();
    return this.http.get<ListSecretFoldersResponse>(
      "/folders",
      { ...params } as Record<string, unknown>
    );
  }

  async getById(
    params: GetSecretFolderByIdParams
  ): Promise<GetSecretFolderByIdResponse> {
    this.requireAuth();
    return this.http.get<GetSecretFolderByIdResponse>(
      `/folders/${encodeURIComponent(params.id)}`
    );
  }
}
