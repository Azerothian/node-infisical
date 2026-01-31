import { BaseResource } from "./base";
import type {
  GetServiceTokenResponse,
  CreateServiceTokenParams,
  CreateServiceTokenResponse,
  DeleteServiceTokenResponse,
} from "../types/service-tokens";

export class ServiceTokensResource extends BaseResource {
  async get(): Promise<GetServiceTokenResponse> {
    return this.http.get<GetServiceTokenResponse>("/service-token");
  }

  async create(
    params: CreateServiceTokenParams
  ): Promise<CreateServiceTokenResponse> {
    return this.http.post<CreateServiceTokenResponse>(
      "/service-token",
      params
    );
  }

  async delete(serviceTokenId: string): Promise<DeleteServiceTokenResponse> {
    return this.http.delete<DeleteServiceTokenResponse>(
      `/service-token/${encodeURIComponent(serviceTokenId)}`
    );
  }
}
