import { BaseResource } from "./base";
import type {
  CreateExternalKmsParams,
  CreateExternalKmsResponse,
  UpdateExternalKmsParams,
  UpdateExternalKmsResponse,
  DeleteExternalKmsParams,
  DeleteExternalKmsResponse,
  GetExternalKmsParams,
  GetExternalKmsResponse,
  ListExternalKmsParams,
  ListExternalKmsResponse,
} from "../types/external-kms";

export class ExternalKmsResource extends BaseResource {
  async create(params: CreateExternalKmsParams): Promise<CreateExternalKmsResponse> {
    return this.http.post<CreateExternalKmsResponse>(
      "/api/v1/external-kms",
      params
    );
  }

  async update(params: UpdateExternalKmsParams): Promise<UpdateExternalKmsResponse> {
    const { kmsId, ...body } = params;
    return this.http.patch<UpdateExternalKmsResponse>(
      `/api/v1/external-kms/${encodeURIComponent(kmsId)}`,
      body
    );
  }

  async delete(params: DeleteExternalKmsParams): Promise<DeleteExternalKmsResponse> {
    return this.http.delete<DeleteExternalKmsResponse>(
      `/api/v1/external-kms/${encodeURIComponent(params.kmsId)}`
    );
  }

  async get(params: GetExternalKmsParams): Promise<GetExternalKmsResponse> {
    return this.http.get<GetExternalKmsResponse>(
      `/api/v1/external-kms/${encodeURIComponent(params.kmsId)}`
    );
  }

  async list(params?: ListExternalKmsParams): Promise<ListExternalKmsResponse> {
    return this.http.get<ListExternalKmsResponse>(
      "/api/v1/external-kms",
      { ...params } as Record<string, unknown>
    );
  }
}
