import { BaseResource } from "./base";
import type {
  GetOidcConfigParams,
  GetOidcConfigResponse,
  CreateOidcConfigParams,
  CreateOidcConfigResponse,
  UpdateOidcConfigParams,
  UpdateOidcConfigResponse,
} from "../types/oidc-config";

export class OidcConfigResource extends BaseResource {
  async get(params: GetOidcConfigParams): Promise<GetOidcConfigResponse> {
    return this.http.get<GetOidcConfigResponse>(
      "/api/v1/sso/oidc/config",
      { ...params } as Record<string, unknown>
    );
  }

  async create(params: CreateOidcConfigParams): Promise<CreateOidcConfigResponse> {
    return this.http.post<CreateOidcConfigResponse>(
      "/api/v1/sso/oidc/config",
      params
    );
  }

  async update(params: UpdateOidcConfigParams): Promise<UpdateOidcConfigResponse> {
    return this.http.patch<UpdateOidcConfigResponse>(
      "/api/v1/sso/oidc/config",
      params
    );
  }
}
