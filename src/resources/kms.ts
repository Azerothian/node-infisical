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
  GetKmsKeyByNameParams,
  GetKmsKeyByNameResponse,
  GetKmsPublicKeyParams,
  GetKmsPublicKeyResponse,
  GetKmsPrivateKeyParams,
  GetKmsPrivateKeyResponse,
  ListKmsSigningAlgorithmsParams,
  ListKmsSigningAlgorithmsResponse,
  KmsSignParams,
  KmsSignResponse,
  KmsVerifyParams,
  KmsVerifyResponse,
} from "../types/kms";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class KmsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "kms");
  }
  async createKey(params: CreateKmsKeyParams): Promise<CreateKmsKeyResponse> {
    this.requireAuth();
    return this.http.post<CreateKmsKeyResponse>(
      "/api/v1/kms/keys",
      params
    );
  }

  async updateKey(params: UpdateKmsKeyParams): Promise<UpdateKmsKeyResponse> {
    this.requireAuth();
    const { keyId, ...body } = params;
    return this.http.patch<UpdateKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}`,
      body
    );
  }

  async deleteKey(params: DeleteKmsKeyParams): Promise<DeleteKmsKeyResponse> {
    this.requireAuth();
    return this.http.delete<DeleteKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}`
    );
  }

  async getKey(params: GetKmsKeyParams): Promise<GetKmsKeyResponse> {
    this.requireAuth();
    return this.http.get<GetKmsKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}`
    );
  }

  async listKeys(params: ListKmsKeysParams): Promise<ListKmsKeysResponse> {
    this.requireAuth();
    return this.http.get<ListKmsKeysResponse>(
      "/api/v1/kms/keys",
      { ...params } as Record<string, unknown>
    );
  }

  async encrypt(params: KmsEncryptParams): Promise<KmsEncryptResponse> {
    this.requireAuth();
    const { keyId, ...body } = params;
    return this.http.post<KmsEncryptResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/encrypt`,
      body
    );
  }

  async decrypt(params: KmsDecryptParams): Promise<KmsDecryptResponse> {
    this.requireAuth();
    const { keyId, ...body } = params;
    return this.http.post<KmsDecryptResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/decrypt`,
      body
    );
  }

  async getKeyByName(params: GetKmsKeyByNameParams): Promise<GetKmsKeyByNameResponse> {
    this.requireAuth();
    const { keyName, ...query } = params;
    return this.http.get<GetKmsKeyByNameResponse>(
      `/api/v1/kms/keys/key-name/${encodeURIComponent(keyName)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async getPublicKey(params: GetKmsPublicKeyParams): Promise<GetKmsPublicKeyResponse> {
    this.requireAuth();
    return this.http.get<GetKmsPublicKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}/public-key`
    );
  }

  async getPrivateKey(params: GetKmsPrivateKeyParams): Promise<GetKmsPrivateKeyResponse> {
    this.requireAuth();
    return this.http.get<GetKmsPrivateKeyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}/private-key`
    );
  }

  async listSigningAlgorithms(params: ListKmsSigningAlgorithmsParams): Promise<ListKmsSigningAlgorithmsResponse> {
    this.requireAuth();
    return this.http.get<ListKmsSigningAlgorithmsResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(params.keyId)}/signing-algorithms`
    );
  }

  async sign(params: KmsSignParams): Promise<KmsSignResponse> {
    this.requireAuth();
    const { keyId, ...body } = params;
    return this.http.post<KmsSignResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/sign`,
      body
    );
  }

  async verify(params: KmsVerifyParams): Promise<KmsVerifyResponse> {
    this.requireAuth();
    const { keyId, ...body } = params;
    return this.http.post<KmsVerifyResponse>(
      `/api/v1/kms/keys/${encodeURIComponent(keyId)}/verify`,
      body
    );
  }
}
