import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
import type {
  ListSecretTagsParams,
  ListSecretTagsResponse,
  GetSecretTagByIdParams,
  GetSecretTagByIdResponse,
  GetSecretTagBySlugParams,
  GetSecretTagBySlugResponse,
  CreateSecretTagParams,
  CreateSecretTagResponse,
  UpdateSecretTagParams,
  UpdateSecretTagResponse,
  DeleteSecretTagParams,
  DeleteSecretTagResponse,
} from "../types/secret-tags";

export class SecretTagsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "secretTags");
  }
  async list(params: ListSecretTagsParams): Promise<ListSecretTagsResponse> {
    this.requireAuth();
    return this.http.get<ListSecretTagsResponse>(
      `/api/v1/${encodeURIComponent(params.projectId)}/tags`
    );
  }

  async getById(params: GetSecretTagByIdParams): Promise<GetSecretTagByIdResponse> {
    this.requireAuth();
    return this.http.get<GetSecretTagByIdResponse>(
      `/api/v1/${encodeURIComponent(params.projectId)}/tags/${encodeURIComponent(params.tagId)}`
    );
  }

  async getBySlug(params: GetSecretTagBySlugParams): Promise<GetSecretTagBySlugResponse> {
    this.requireAuth();
    return this.http.get<GetSecretTagBySlugResponse>(
      `/api/v1/${encodeURIComponent(params.projectId)}/tags/slug/${encodeURIComponent(params.tagSlug)}`
    );
  }

  async create(params: CreateSecretTagParams): Promise<CreateSecretTagResponse> {
    this.requireAuth();
    const { projectId, ...body } = params;
    return this.http.post<CreateSecretTagResponse>(
      `/api/v1/${encodeURIComponent(projectId)}/tags`,
      body
    );
  }

  async update(params: UpdateSecretTagParams): Promise<UpdateSecretTagResponse> {
    this.requireAuth();
    const { projectId, tagId, ...body } = params;
    return this.http.patch<UpdateSecretTagResponse>(
      `/api/v1/${encodeURIComponent(projectId)}/tags/${encodeURIComponent(tagId)}`,
      body
    );
  }

  async delete(params: DeleteSecretTagParams): Promise<DeleteSecretTagResponse> {
    this.requireAuth();
    return this.http.delete<DeleteSecretTagResponse>(
      `/api/v1/${encodeURIComponent(params.projectId)}/tags/${encodeURIComponent(params.tagId)}`
    );
  }
}
