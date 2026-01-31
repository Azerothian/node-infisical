// --- Existing types (preserved) ---
export interface SecretAccessEntry {
  allowedMembership: {
    id: string;
    userId: string;
    user: {
      id: string;
      email?: string | null;
      username: string;
    };
  } | null;
  allowedIdentity: {
    id: string;
    name: string;
  } | null;
}

export interface GetSecretAccessListParams {
  secretName: string;
  projectId: string;
  environment: string;
  secretPath?: string;
}

export interface GetSecretAccessListResponse {
  accessList: SecretAccessEntry[];
}

// --- New v4 API types ---

// Base secret shape returned from API
export interface Secret {
  id: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment?: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface SecretTagRef {
  id: string;
  slug: string;
  name: string;
  color?: string | null;
}

// --- List Secrets ---
export interface ListSecretsParams {
  projectId: string;
  environment: string;
  secretPath?: string;
  expandSecretReferences?: boolean;
  recursive?: boolean;
  include_imports?: boolean;
  tagSlugs?: string;
  viewSecretValue?: boolean;
  metadataFilter?: string;
}

export interface ListSecretsResponse {
  secrets: Secret[];
  imports?: Array<{
    secretPath: string;
    environment: string;
    folderId?: string;
    secrets: Secret[];
  }>;
}

// --- Get Secret by Name ---
export interface GetSecretByNameParams {
  secretName: string;
  projectId: string;
  environment: string;
  secretPath?: string;
  version?: number;
  type?: string;
  viewSecretValue?: boolean;
  expandSecretReferences?: boolean;
  include_imports?: boolean;
}

export interface GetSecretByNameResponse {
  secret: Secret & { secretPath: string; tags?: SecretTagRef[] };
}

// --- Get Secret by ID ---
export interface GetSecretByIdParams {
  secretId: string;
}

export interface GetSecretByIdResponse {
  secret: Secret & { secretPath: string; tags?: SecretTagRef[] };
}

// --- Create Secret ---
export interface CreateSecretParams {
  secretName: string;
  projectId: string;
  environment: string;
  secretValue: string;
  secretPath?: string;
  secretComment?: string;
  tagIds?: string[];
  skipMultilineEncoding?: boolean;
  type?: string;
  secretReminderRepeatDays?: number | null;
  secretReminderNote?: string | null;
  secretMetadata?: Record<string, string>;
}

export interface CreateSecretResponse {
  secret: Secret;
}

// --- Update Secret ---
export interface UpdateSecretParams {
  secretName: string;
  projectId: string;
  environment: string;
  secretValue?: string;
  secretPath?: string;
  skipMultilineEncoding?: boolean;
  type?: string;
  tagIds?: string[];
  metadata?: Record<string, string>;
  secretMetadata?: Record<string, string>;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  secretReminderRecipients?: string[];
  newSecretName?: string;
  secretComment?: string;
}

export interface UpdateSecretResponse {
  secret: Secret;
}

// --- Delete Secret ---
export interface DeleteSecretParams {
  secretName: string;
  projectId: string;
  environment: string;
  secretPath?: string;
  type?: string;
}

export interface DeleteSecretResponse {
  secret: Secret;
}

// --- Batch Create ---
export interface BatchCreateSecretsParams {
  projectId: string;
  environment: string;
  secretPath?: string;
  secrets: Array<{
    secretKey: string;
    secretValue: string;
    secretComment?: string;
    skipMultilineEncoding?: boolean;
    metadata?: Record<string, string>;
    secretMetadata?: Record<string, string>;
    tagIds?: string[];
  }>;
}

export interface BatchCreateSecretsResponse {
  secrets: Secret[];
}

// --- Batch Update ---
export interface BatchUpdateSecretsParams {
  projectId: string;
  environment: string;
  secretPath?: string;
  mode?: string;
  secrets: Array<{
    secretKey: string;
    secretValue?: string;
    secretPath?: string;
    secretComment?: string;
    skipMultilineEncoding?: boolean;
    newSecretName?: string;
    tagIds?: string[];
    secretReminderNote?: string | null;
    secretMetadata?: Record<string, string>;
    secretReminderRepeatDays?: number | null;
  }>;
}

export interface BatchUpdateSecretsResponse {
  secrets: Secret[];
}

// --- Batch Delete ---
export interface BatchDeleteSecretsParams {
  projectId: string;
  environment: string;
  secretPath?: string;
  secrets: Array<{
    secretKey: string;
    type?: string;
  }>;
}

export interface BatchDeleteSecretsResponse {
  secrets: Secret[];
}

// --- Move Secrets ---
export interface MoveSecretsParams {
  projectId: string;
  sourceEnvironment: string;
  sourceSecretPath?: string;
  destinationEnvironment: string;
  destinationSecretPath?: string;
  secretIds: string[];
  shouldOverwrite?: boolean;
}

export interface MoveSecretsResponse {
  isSourceUpdated: boolean;
  isDestinationUpdated: boolean;
}
