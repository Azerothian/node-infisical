export interface SharedSecret {
  id: string;
  encryptedValue: string;
  iv: string;
  tag: string;
  hashedHex: string;
  expiresAt: string;
  expiresAfterViews?: number | null;
  accessType: string;
  orgId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSharedSecretParams {
  encryptedValue: string;
  iv: string;
  tag: string;
  hashedHex: string;
  expiresAt: string;
  expiresAfterViews?: number;
  accessType?: string;
}

export interface CreateSharedSecretResponse {
  id: string;
}

export interface GetSharedSecretParams {
  sharedSecretId: string;
  hashedHex: string;
}

export interface GetSharedSecretResponse {
  encryptedValue: string;
  iv: string;
  tag: string;
  expiresAt: string;
  accessType: string;
  orgId?: string | null;
}

export interface DeleteSharedSecretParams {
  sharedSecretId: string;
}

export interface DeleteSharedSecretResponse {
  secret: SharedSecret;
}

export interface ListSharedSecretsResponse {
  secrets: SharedSecret[];
}
