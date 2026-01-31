export interface ScimToken {
  id: string;
  orgId: string;
  description: string;
  ttlDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScimUser {
  schemas: string[];
  id: string;
  userName: string;
  name?: {
    familyName?: string;
    givenName?: string;
  };
  emails?: Array<{
    primary: boolean;
    value: string;
    type: string;
  }>;
  displayName: string;
  active: boolean;
}

export interface ScimGroup {
  schemas: string[];
  id: string;
  displayName: string;
  members?: Array<{
    value: string;
    display?: string;
  }>;
  meta: {
    resourceType: string;
  };
}

export interface ScimListResponse<T> {
  Resources: T[];
  itemsPerPage: number;
  schemas: string[];
  startIndex: number;
  totalResults: number;
}

export interface ScimEvent {
  id: string;
  [key: string]: unknown;
}

export interface CreateScimTokenParams {
  organizationId: string;
  description?: string;
  ttlDays?: number;
}

export interface CreateScimTokenResponse {
  scimToken: string;
}

export interface ListScimTokensParams {
  organizationId: string;
}

export interface ListScimTokensResponse {
  scimTokens: ScimToken[];
}

export interface DeleteScimTokenParams {
  scimTokenId: string;
}

export interface DeleteScimTokenResponse {
  scimToken: ScimToken;
}

export interface ListScimEventsParams {
  since?: string;
  limit?: number;
  offset?: number;
}

export interface ListScimEventsResponse {
  scimEvents: ScimEvent[];
}

export interface ListScimUsersParams {
  startIndex?: number;
  count?: number;
  filter?: string;
}

export type ListScimUsersResponse = ScimListResponse<ScimUser>;

export interface GetScimUserParams {
  orgMembershipId: string;
}

export type GetScimUserResponse = ScimUser;

export interface CreateScimUserParams {
  schemas: string[];
  userName: string;
  name?: {
    familyName?: string;
    givenName?: string;
  };
  emails?: Array<{
    primary: boolean;
    value: string;
  }>;
  active?: boolean;
}

export type CreateScimUserResponse = ScimUser;

export interface ReplaceScimUserParams {
  orgMembershipId: string;
  schemas: string[];
  userName: string;
  name?: {
    familyName?: string;
    givenName?: string;
  };
  emails?: Array<{
    primary: boolean;
    value: string;
  }>;
  active: boolean;
}

export type ReplaceScimUserResponse = ScimUser;

export interface UpdateScimUserParams {
  orgMembershipId: string;
  schemas: string[];
  Operations: Array<{
    op: string;
    path?: string;
    value?: unknown;
  }>;
}

export type UpdateScimUserResponse = ScimUser;

export interface DeleteScimUserParams {
  orgMembershipId: string;
}

export interface CreateScimGroupParams {
  schemas: string[];
  displayName: string;
  members?: Array<{
    value: string;
    display: string;
  }>;
}

export type CreateScimGroupResponse = ScimGroup;

export interface ListScimGroupsParams {
  startIndex?: number;
  count?: number;
  filter?: string;
  excludedAttributes?: string;
}

export type ListScimGroupsResponse = ScimListResponse<ScimGroup>;

export interface GetScimGroupParams {
  groupId: string;
}

export type GetScimGroupResponse = ScimGroup;

export interface ReplaceScimGroupParams {
  groupId: string;
  schemas: string[];
  id: string;
  displayName: string;
  members: Array<{
    value: string;
    display: string;
  }>;
}

export type ReplaceScimGroupResponse = ScimGroup;

export interface UpdateScimGroupParams {
  groupId: string;
  schemas: string[];
  Operations: Array<{
    op: string;
    path?: string;
    value?: unknown;
  }>;
}

export type UpdateScimGroupResponse = ScimGroup;

export interface DeleteScimGroupParams {
  groupId: string;
}
