export interface SecretFolder {
  id: string;
  name: string;
  envId: string;
  parentId?: string | null;
  isReserved?: boolean;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SecretFolderWithPath extends SecretFolder {
  path: string;
}

export interface CreateSecretFolderParams {
  projectId: string;
  environment: string;
  name: string;
  path?: string;
  description?: string | null;
}

export interface CreateSecretFolderResponse {
  folder: SecretFolderWithPath;
}

export interface UpdateSecretFolderParams {
  folderId: string;
  projectId: string;
  environment: string;
  name: string;
  path?: string;
  description?: string | null;
}

export interface UpdateSecretFolderResponse {
  folder: SecretFolderWithPath;
}

export interface UpdateSecretFolderBatchItem {
  id: string;
  environment: string;
  name: string;
  path?: string;
  description?: string | null;
}

export interface UpdateSecretFolderBatchParams {
  projectId: string;
  folders: UpdateSecretFolderBatchItem[];
}

export interface UpdateSecretFolderBatchResponse {
  folders: SecretFolder[];
}

export interface DeleteSecretFolderParams {
  folderIdOrName: string;
  projectId: string;
  environment: string;
  path?: string;
  forceDelete?: boolean;
}

export interface DeleteSecretFolderResponse {
  folder: SecretFolder;
}

export interface ListSecretFoldersParams {
  projectId: string;
  environment: string;
  path?: string;
  recursive?: boolean;
  lastSecretModified?: string;
}

export interface SecretFolderWithRelativePath extends SecretFolder {
  relativePath?: string;
}

export interface ListSecretFoldersResponse {
  folders: SecretFolderWithRelativePath[];
}

export interface GetSecretFolderByIdParams {
  id: string;
}

export interface SecretFolderDetailed extends SecretFolder {
  environment: {
    envId: string;
    envName: string;
    envSlug: string;
  };
  path: string;
  projectId: string;
}

export interface GetSecretFolderByIdResponse {
  folder: SecretFolderDetailed;
}
