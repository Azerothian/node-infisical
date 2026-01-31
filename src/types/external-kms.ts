export interface ExternalKms {
  id: string;
  slug: string;
  description?: string | null;
  provider: string;
  providerInput: Record<string, unknown>;
  orgId: string;
  status: string;
  statusDetails?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExternalKmsParams {
  slug: string;
  description?: string;
  provider: string;
  providerInput: Record<string, unknown>;
}

export interface CreateExternalKmsResponse {
  externalKms: ExternalKms;
}

export interface UpdateExternalKmsParams {
  kmsId: string;
  slug?: string;
  description?: string;
  providerInput?: Record<string, unknown>;
}

export interface UpdateExternalKmsResponse {
  externalKms: ExternalKms;
}

export interface DeleteExternalKmsParams {
  kmsId: string;
}

export interface DeleteExternalKmsResponse {
  externalKms: ExternalKms;
}

export interface GetExternalKmsParams {
  kmsId: string;
}

export interface GetExternalKmsResponse {
  externalKms: ExternalKms;
}

export interface ListExternalKmsParams {
  offset?: number;
  limit?: number;
}

export interface ListExternalKmsResponse {
  externalKmsList: ExternalKms[];
  totalCount: number;
}
