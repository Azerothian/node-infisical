export interface KmsKey {
  id: string;
  name: string;
  description?: string | null;
  projectId: string;
  isDisabled: boolean;
  encryptionAlgorithm: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKmsKeyParams {
  projectId: string;
  name: string;
  description?: string;
  encryptionAlgorithm?: string;
}

export interface CreateKmsKeyResponse {
  key: KmsKey;
}

export interface UpdateKmsKeyParams {
  keyId: string;
  name?: string;
  description?: string;
  isDisabled?: boolean;
}

export interface UpdateKmsKeyResponse {
  key: KmsKey;
}

export interface DeleteKmsKeyParams {
  keyId: string;
}

export interface DeleteKmsKeyResponse {
  key: KmsKey;
}

export interface GetKmsKeyParams {
  keyId: string;
}

export interface GetKmsKeyResponse {
  key: KmsKey;
}

export interface ListKmsKeysParams {
  projectId: string;
  offset?: number;
  limit?: number;
}

export interface ListKmsKeysResponse {
  keys: KmsKey[];
  totalCount: number;
}

export interface KmsEncryptParams {
  keyId: string;
  plaintext: string;
}

export interface KmsEncryptResponse {
  ciphertext: string;
}

export interface KmsDecryptParams {
  keyId: string;
  ciphertext: string;
}

export interface KmsDecryptResponse {
  plaintext: string;
}

export interface GetKmsKeyByNameParams {
  keyName: string;
  projectId: string;
}

export interface GetKmsKeyByNameResponse {
  key: KmsKey;
}

export interface GetKmsPublicKeyParams {
  keyId: string;
}

export interface GetKmsPublicKeyResponse {
  publicKey: string;
}

export interface GetKmsPrivateKeyParams {
  keyId: string;
}

export interface GetKmsPrivateKeyResponse {
  privateKey: string;
}

export interface ListKmsSigningAlgorithmsParams {
  keyId: string;
}

export interface ListKmsSigningAlgorithmsResponse {
  signingAlgorithms: string[];
}

export interface KmsSignParams {
  keyId: string;
  signingAlgorithm: string;
  data: string;
  isDigest?: boolean;
}

export interface KmsSignResponse {
  signature: string;
  keyId: string;
  signingAlgorithm: string;
}

export interface KmsVerifyParams {
  keyId: string;
  data: string;
  signature: string;
  signingAlgorithm: string;
  isDigest?: boolean;
}

export interface KmsVerifyResponse {
  signatureValid: boolean;
  keyId: string;
  signingAlgorithm: string;
}
