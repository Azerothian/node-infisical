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
