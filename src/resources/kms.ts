import { BaseResource } from "./base";
import type {
  CreateKmsKeyParams,
  CreateKmsKeyResponse,
  UpdateKmsKeyParams,
  UpdateKmsKeyResponse,
  DeleteKmsKeyParams,
  DeleteKmsKeyResponse,
  GetKmsKeyParams,
  GetKmsKeyResponse,
  ListKmsKeysParams,
  ListKmsKeysResponse,
  KmsEncryptParams,
  KmsEncryptResponse,
  KmsDecryptParams,
  KmsDecryptResponse,
} from "../types/kms";

export class KmsResource extends BaseResource {
  async createKey(params: CreateKmsKeyParams): Promise<CreateKmsKeyResponse> {
    return this.http.post<CreateKmsKeyResponse>(
      "/api/v1/kms/keys",
      params
    );
  }

  async updateKey(params: UpdateKmsKeyParams): Promise<UpdateKmsKeyResponse> {
    const { keyId, ...body } = params;
    return this.http.patch<UpdateKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}`,
      body
    );
  }

  async deleteKey(params: DeleteKmsKeyParams): Promise<DeleteKmsKeyResponse> {
    return this.http.delete<DeleteKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}`
    );
  }

  async getKey(params: GetKmsKeyParams): Promise<GetKmsKeyResponse> {
    return this.http.get<GetKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}`
    );
  }

  async listKeys(params: ListKmsKeysParams): Promise<ListKmsKeysResponse> {
    return this.http.get<ListKmsKeysResponse>(
      "/api/v1/kms/keys",
      { ...params } as Record<string, unknown>
    );
  }

  async encrypt(params: KmsEncryptParams): Promise<KmsEncryptResponse> {
    const { keyId, ...body } = params;
    return this.http.post<KmsEncryptResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/encrypt`,
      body
    );
  }

  async decrypt(params: KmsDecryptParams): Promise<KmsDecryptResponse> {
    const { keyId, ...body } = params;
    return this.http.post<KmsDecryptResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/decrypt`,
      body
    );
  }
}
