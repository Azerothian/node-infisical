import { BaseResource } from "./base";
import type {
  GetServiceTokenResponse,
  CreateServiceTokenParams,
  CreateServiceTokenResponse,
  DeleteServiceTokenResponse,
} from "../types/service-tokens";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class ServiceTokensResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "serviceTokens");
  }

  async get(): Promise<GetServiceTokenResponse> {
    this.requireAuth();
    return this.http.get<GetServiceTokenResponse>("/service-token");
  }

  async create(
    params: CreateServiceTokenParams
  ): Promise<CreateServiceTokenResponse> {
    this.requireAuth();
    return this.http.post<CreateServiceTokenResponse>(
      "/service-token",
      params
    );
  }

  async delete(serviceTokenId: string): Promise<DeleteServiceTokenResponse> {
    this.requireAuth();
    return this.http.delete<DeleteServiceTokenResponse>(
      `/service-token/${encodeURIComponent(serviceTokenId)}`
    );
  }
}
