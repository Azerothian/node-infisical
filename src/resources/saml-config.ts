import { BaseResource } from "./base";
import type {
  GetSamlConfigParams,
  GetSamlConfigResponse,
  CreateSamlConfigParams,
  CreateSamlConfigResponse,
  UpdateSamlConfigParams,
  UpdateSamlConfigResponse,
} from "../types/saml-config";

export class SamlConfigResource extends BaseResource {
  async get(params: GetSamlConfigParams): Promise<GetSamlConfigResponse> {
    return this.http.get<GetSamlConfigResponse>(
      "/api/v1/sso/config",
      { ...params } as Record<string, unknown>
    );
  }

  async create(params: CreateSamlConfigParams): Promise<CreateSamlConfigResponse> {
    return this.http.post<CreateSamlConfigResponse>(
      "/api/v1/sso/config",
      params
    );
  }

  async update(params: UpdateSamlConfigParams): Promise<UpdateSamlConfigResponse> {
    return this.http.patch<UpdateSamlConfigResponse>(
      "/api/v1/sso/config",
      params
    );
  }
}
