export interface ServiceToken {
  id: string;
  name: string;
  projectId: string;
  userId?: string | null;
  scopes: Array<{ environment: string; secretPath: string }>;
  lastUsed?: string | null;
  expiresAt?: string | null;
  encryptedKey: string;
  iv: string;
  tag: string;
  secretHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface SanitizedServiceToken {
  id: string;
  name: string;
  projectId: string;
  userId?: string | null;
  scopes: Array<{ environment: string; secretPath: string }>;
  lastUsed?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetServiceTokenResponse extends ServiceToken {
  workspace: string;
  user: {
    id: string;
    username: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    _id: string;
    __v: number;
  };
  _id: string;
  __v: number;
}

export interface CreateServiceTokenParams {
  name: string;
  workspaceId: string;
  scopes: Array<{ environment: string; secretPath: string }>;
  encryptedKey: string;
  iv: string;
  tag: string;
  expiresIn: number | null;
  permissions: Array<"read" | "write">;
}

export interface CreateServiceTokenResponse {
  serviceToken: string;
  serviceTokenData: SanitizedServiceToken;
}

export interface DeleteServiceTokenResponse {
  serviceTokenData: SanitizedServiceToken;
}
