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
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IntegrationAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "integrationAuth");
  }

  async create(params: CreateIntegrationAuthParams): Promise<CreateIntegrationAuthResponse> {
    this.requireAuth();
    return this.http.post<CreateIntegrationAuthResponse>(
      "/api/v1/integration-auth/access-token",
      params
    );
  }

  async get(params: GetIntegrationAuthParams): Promise<GetIntegrationAuthResponse> {
    this.requireAuth();
    return this.http.get<GetIntegrationAuthResponse>(
      `/api/v1/integration-auth/${encodeURIComponent(params.integrationAuthId)}`
    );
  }

  async delete(params: DeleteIntegrationAuthParams): Promise<DeleteIntegrationAuthResponse> {
    this.requireAuth();
    return this.http.delete<DeleteIntegrationAuthResponse>(
      `/api/v1/integration-auth/${encodeURIComponent(params.integrationAuthId)}`
    );
  }

  async list(params: ListIntegrationAuthParams): Promise<ListIntegrationAuthResponse> {
    this.requireAuth();
    return this.http.get<ListIntegrationAuthResponse>(
      "/api/v1/integration-auth",
      { ...params } as Record<string, unknown>
    );
  }
}
