export interface SecretSync {
  id: string;
  name: string;
  description?: string | null;
  destination: string;
  projectId: string;
  sourceEnvironment: string;
  sourceSecretPath: string;
  connectionId: string;
  destinationConfig: Record<string, unknown>;
  syncOptions: Record<string, unknown>;
  isAutoSyncEnabled: boolean;
  lastSyncedAt?: string | null;
  syncStatus?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSecretSyncParams {
  destination: string;
  name: string;
  description?: string;
  projectId: string;
  sourceEnvironment: string;
  sourceSecretPath: string;
  connectionId: string;
  destinationConfig: Record<string, unknown>;
  syncOptions?: Record<string, unknown>;
  isAutoSyncEnabled?: boolean;
}

export interface CreateSecretSyncResponse {
  secretSync: SecretSync;
}

export interface UpdateSecretSyncParams {
  destination: string;
  syncId: string;
  name?: string;
  description?: string;
  connectionId?: string;
  sourceEnvironment?: string;
  sourceSecretPath?: string;
  destinationConfig?: Record<string, unknown>;
  syncOptions?: Record<string, unknown>;
  isAutoSyncEnabled?: boolean;
}

export interface UpdateSecretSyncResponse {
  secretSync: SecretSync;
}

export interface DeleteSecretSyncParams {
  destination: string;
  syncId: string;
  removeSecrets?: boolean;
}

export interface DeleteSecretSyncResponse {
  secretSync: SecretSync;
}

export interface GetSecretSyncParams {
  destination: string;
  syncId: string;
}

export interface GetSecretSyncResponse {
  secretSync: SecretSync;
}

export interface ListSecretSyncsParams {
  destination: string;
  projectId: string;
}

export interface ListSecretSyncsResponse {
  secretSyncs: SecretSync[];
}

export interface TriggerSecretSyncParams {
  destination: string;
  syncId: string;
}

export interface TriggerSecretSyncResponse {
  secretSync: SecretSync;
}

export interface ImportSecretSyncParams {
  destination: string;
  syncId: string;
}

export interface ImportSecretSyncResponse {
  secretSync: SecretSync;
}

export interface RemoveSecretSyncSecretsParams {
  destination: string;
  syncId: string;
}

export interface RemoveSecretSyncSecretsResponse {
  secretSync: SecretSync;
}

export interface GetSecretSyncByNameParams {
  destination: string;
  syncName: string;
}

export interface GetSecretSyncByNameResponse {
  secretSync: SecretSync;
}
