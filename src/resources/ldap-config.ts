import { BaseResource } from "./base";
import type {
  GetLdapConfigParams,
  GetLdapConfigResponse,
  CreateLdapConfigParams,
  CreateLdapConfigResponse,
  UpdateLdapConfigParams,
  UpdateLdapConfigResponse,
  TestLdapConnectionParams,
  TestLdapConnectionResponse,
  ListLdapGroupMapsParams,
  ListLdapGroupMapsResponse,
  CreateLdapGroupMapParams,
  CreateLdapGroupMapResponse,
  DeleteLdapGroupMapParams,
  DeleteLdapGroupMapResponse,
} from "../types/ldap-config";

export class LdapConfigResource extends BaseResource {
  async get(params: GetLdapConfigParams): Promise<GetLdapConfigResponse> {
    return this.http.get<GetLdapConfigResponse>(
      "/api/v1/ldap/config",
      { ...params } as Record<string, unknown>
    );
  }

  async create(params: CreateLdapConfigParams): Promise<CreateLdapConfigResponse> {
    return this.http.post<CreateLdapConfigResponse>(
      "/api/v1/ldap/config",
      params
    );
  }

  async update(params: UpdateLdapConfigParams): Promise<UpdateLdapConfigResponse> {
    return this.http.patch<UpdateLdapConfigResponse>(
      "/api/v1/ldap/config",
      params
    );
  }

  async testConnection(params: TestLdapConnectionParams): Promise<TestLdapConnectionResponse> {
    return this.http.post<TestLdapConnectionResponse>(
      "/api/v1/ldap/config/test-connection",
      params
    );
  }

  async listGroupMaps(params: ListLdapGroupMapsParams): Promise<ListLdapGroupMapsResponse> {
    return this.http.get<ListLdapGroupMapsResponse>(
      `/api/v1/ldap/config/${encodeURIComponent(params.configId)}/group-maps`
    );
  }

  async createGroupMap(params: CreateLdapGroupMapParams): Promise<CreateLdapGroupMapResponse> {
    const { configId, ...body } = params;
    return this.http.post<CreateLdapGroupMapResponse>(
      `/api/v1/ldap/config/${encodeURIComponent(configId)}/group-maps`,
      body
    );
  }

  async deleteGroupMap(params: DeleteLdapGroupMapParams): Promise<DeleteLdapGroupMapResponse> {
    return this.http.delete<DeleteLdapGroupMapResponse>(
      `/api/v1/ldap/config/${encodeURIComponent(params.configId)}/group-maps/${encodeURIComponent(params.groupMapId)}`
    );
  }
}
