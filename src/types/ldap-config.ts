export interface LdapConfig {
  id: string;
  organization: string;
  isActive: boolean;
  url: string;
  bindDN: string;
  bindPass: string;
  uniqueUserAttribute: string;
  searchBase: string;
  searchFilter: string;
  groupSearchBase: string;
  groupSearchFilter: string;
  caCert: string;
}

export interface LdapGroupMap {
  id: string;
  ldapConfigId: string;
  ldapGroupCN: string;
  group: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface LdapGroupMapRecord {
  id: string;
  ldapConfigId: string;
  ldapGroupCN: string;
  groupId: string;
}

export interface GetLdapConfigParams {
  organizationId: string;
}

export type GetLdapConfigResponse = LdapConfig;

export interface CreateLdapConfigParams {
  organizationId: string;
  isActive: boolean;
  url: string;
  bindDN: string;
  bindPass: string;
  uniqueUserAttribute?: string;
  searchBase: string;
  searchFilter?: string;
  groupSearchBase: string;
  groupSearchFilter?: string;
  caCert?: string;
}

export type CreateLdapConfigResponse = LdapConfig;

export interface UpdateLdapConfigParams {
  organizationId: string;
  isActive?: boolean;
  url?: string;
  bindDN?: string;
  bindPass?: string;
  uniqueUserAttribute?: string;
  searchBase?: string;
  searchFilter?: string;
  groupSearchBase?: string;
  groupSearchFilter?: string;
  caCert?: string;
}

export type UpdateLdapConfigResponse = LdapConfig;

export interface TestLdapConnectionParams {
  url: string;
  bindDN: string;
  bindPass: string;
  caCert: string;
}

export type TestLdapConnectionResponse = boolean;

export interface ListLdapGroupMapsParams {
  configId: string;
}

export type ListLdapGroupMapsResponse = LdapGroupMap[];

export interface CreateLdapGroupMapParams {
  configId: string;
  ldapGroupCN: string;
  groupSlug: string;
}

export type CreateLdapGroupMapResponse = LdapGroupMapRecord;

export interface DeleteLdapGroupMapParams {
  configId: string;
  groupMapId: string;
}

export type DeleteLdapGroupMapResponse = LdapGroupMapRecord;
