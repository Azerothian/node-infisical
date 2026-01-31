export interface SecretImportEnv {
  name: string;
  slug: string;
  id: string;
}

export interface SecretImport {
  id: string;
  folderId: string;
  importPath: string;
  importEnv: SecretImportEnv;
  position: number;
  isReplication?: boolean;
  isReplicationSuccess?: boolean | null;
  replicationStatus?: string | null;
  lastReplicated?: string | null;
  isReserved?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSecretImportParams {
  projectId: string;
  environment: string;
  path?: string;
  import: {
    environment: string;
    path: string;
  };
  isReplication?: boolean;
}

export interface CreateSecretImportResponse {
  message: string;
  secretImport: SecretImport;
}

export interface UpdateSecretImportParams {
  secretImportId: string;
  projectId: string;
  environment: string;
  path?: string;
  import: {
    environment?: string;
    path?: string;
    position?: number;
  };
}

export interface UpdateSecretImportResponse {
  message: string;
  secretImport: SecretImport;
}

export interface DeleteSecretImportParams {
  secretImportId: string;
  projectId: string;
  environment: string;
  path?: string;
}

export interface DeleteSecretImportResponse {
  message: string;
  secretImport: SecretImport;
}

export interface ResyncReplicationParams {
  secretImportId: string;
  projectId: string;
  environment: string;
  path?: string;
}

export interface ResyncReplicationResponse {
  message: string;
}

export interface ListSecretImportsParams {
  projectId: string;
  environment: string;
  path?: string;
}

export interface ListSecretImportsResponse {
  message: string;
  secretImports: SecretImport[];
}

export interface GetSecretImportParams {
  secretImportId: string;
}

export interface SecretImportDetailed extends SecretImport {
  environment: {
    id: string;
    name: string;
    slug: string;
  };
  projectId: string;
  secretPath: string;
}

export interface GetSecretImportResponse {
  secretImport: SecretImportDetailed;
}

export interface GetRawSecretsFromImportsParams {
  projectId: string;
  environment: string;
  path?: string;
}

export interface RawSecret {
  id: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment?: string;
  secretReminderNote?: string | null;
  secretReminderRepeatDays?: number | null;
  skipMultilineEncoding?: boolean | null;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ImportedSecretGroup {
  secretPath: string;
  environment: string;
  environmentInfo: {
    id: string;
    name: string;
    slug: string;
  };
  folderId?: string;
  secrets: RawSecret[];
}

export interface GetRawSecretsFromImportsResponse {
  secrets: ImportedSecretGroup[];
}
