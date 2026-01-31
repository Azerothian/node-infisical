export interface SshHostGroup {
  id: string;
  projectId: string;
  name: string;
  hosts: Array<{ id: string; hostname: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSshHostGroupParams {
  projectId: string;
  name: string;
  hostIds?: string[];
}

export interface CreateSshHostGroupResponse {
  hostGroup: SshHostGroup;
}

export interface GetSshHostGroupParams {
  hostGroupId: string;
}

export interface GetSshHostGroupResponse {
  hostGroup: SshHostGroup;
}

export interface UpdateSshHostGroupParams {
  hostGroupId: string;
  name?: string;
  hostIds?: string[];
}

export interface UpdateSshHostGroupResponse {
  hostGroup: SshHostGroup;
}

export interface DeleteSshHostGroupParams {
  hostGroupId: string;
}

export interface DeleteSshHostGroupResponse {
  hostGroup: SshHostGroup;
}

export interface ListSshHostGroupsParams {
  projectId: string;
}

export interface ListSshHostGroupsResponse {
  hostGroups: SshHostGroup[];
}
