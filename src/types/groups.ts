export interface Group {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  role?: string;
  roleId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  email?: string | null;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  isPartOfGroup: boolean;
}

export interface CreateGroupParams {
  organizationId: string;
  name: string;
  slug?: string;
  role?: string;
}

export interface CreateGroupResponse {
  group: Group;
}

export interface UpdateGroupParams {
  groupId: string;
  name?: string;
  slug?: string;
  role?: string;
}

export interface UpdateGroupResponse {
  group: Group;
}

export interface DeleteGroupParams {
  groupId: string;
}

export interface DeleteGroupResponse {
  group: Group;
}

export interface GetGroupParams {
  groupId: string;
}

export interface GetGroupResponse {
  group: Group;
}

export interface ListGroupUsersParams {
  groupId: string;
  offset?: number;
  limit?: number;
  username?: string;
}

export interface ListGroupUsersResponse {
  users: GroupMember[];
  totalCount: number;
}

export interface AddUserToGroupParams {
  groupId: string;
  username: string;
}

export interface AddUserToGroupResponse {
  user: GroupMember;
}

export interface RemoveUserFromGroupParams {
  groupId: string;
  username: string;
}

export interface RemoveUserFromGroupResponse {
  user: GroupMember;
}
