export interface SecretTag {
  id: string;
  slug: string;
  name: string;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListSecretTagsParams {
  projectId: string;
}

export interface ListSecretTagsResponse {
  tags: SecretTag[];
}

export interface GetSecretTagByIdParams {
  projectId: string;
  tagId: string;
}

export interface GetSecretTagByIdResponse {
  tag: SecretTag;
}

export interface GetSecretTagBySlugParams {
  projectId: string;
  tagSlug: string;
}

export interface GetSecretTagBySlugResponse {
  tag: SecretTag;
}

export interface CreateSecretTagParams {
  projectId: string;
  slug: string;
  color: string;
}

export interface CreateSecretTagResponse {
  tag: SecretTag;
}

export interface UpdateSecretTagParams {
  projectId: string;
  tagId: string;
  slug: string;
  color: string;
}

export interface UpdateSecretTagResponse {
  tag: SecretTag;
}

export interface DeleteSecretTagParams {
  projectId: string;
  tagId: string;
}

export interface DeleteSecretTagResponse {
  tag: SecretTag;
}
