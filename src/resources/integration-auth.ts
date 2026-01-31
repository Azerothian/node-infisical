import { BaseResource } from "./base";
import type {
  CreateIntegrationAuthParams,
  CreateIntegrationAuthResponse,
  GetIntegrationAuthParams,
  GetIntegrationAuthResponse,
  DeleteIntegrationAuthParams,
  DeleteIntegrationAuthResponse,
  ListIntegrationAuthParams,
  ListIntegrationAuthResponse,
} from "../types/integration-auth";

export class IntegrationAuthResource extends BaseResource {
  async create(params: CreateIntegrationAuthParams): Promise<CreateIntegrationAuthResponse> {
    return this.http.post<CreateIntegrationAuthResponse>(
      "/api/v1/integration-auth/access-token",
      params
    );
  }

  async get(params: GetIntegrationAuthParams): Promise<GetIntegrationAuthResponse> {
    return this.http.get<GetIntegrationAuthResponse>(
      `/api/v1/integration-auth/${encodeURIComponent(params.integrationAuthId)}`
    );
  }

  async delete(params: DeleteIntegrationAuthParams): Promise<DeleteIntegrationAuthResponse> {
    return this.http.delete<DeleteIntegrationAuthResponse>(
      `/api/v1/integration-auth/${encodeURIComponent(params.integrationAuthId)}`
    );
  }

  async list(params: ListIntegrationAuthParams): Promise<ListIntegrationAuthResponse> {
    return this.http.get<ListIntegrationAuthResponse>(
      "/api/v1/integration-auth",
      { ...params } as Record<string, unknown>
    );
  }
}
