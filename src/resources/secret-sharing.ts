import { BaseResource } from "./base";
import type {
  CreateSharedSecretParams,
  CreateSharedSecretResponse,
  GetSharedSecretParams,
  GetSharedSecretResponse,
  DeleteSharedSecretParams,
  DeleteSharedSecretResponse,
  ListSharedSecretsResponse,
} from "../types/secret-sharing";

export class SecretSharingResource extends BaseResource {
  async create(params: CreateSharedSecretParams): Promise<CreateSharedSecretResponse> {
    return this.http.post<CreateSharedSecretResponse>(
      "/api/v1/secret-sharing",
      params
    );
  }

  async get(params: GetSharedSecretParams): Promise<GetSharedSecretResponse> {
    return this.http.get<GetSharedSecretResponse>(
      `/api/v1/secret-sharing/${encodeURIComponent(params.sharedSecretId)}`,
      { hashedHex: params.hashedHex }
    );
  }

  async delete(params: DeleteSharedSecretParams): Promise<DeleteSharedSecretResponse> {
    return this.http.delete<DeleteSharedSecretResponse>(
      `/api/v1/secret-sharing/${encodeURIComponent(params.sharedSecretId)}`
    );
  }

  async list(): Promise<ListSharedSecretsResponse> {
    return this.http.get<ListSharedSecretsResponse>(
      "/api/v1/secret-sharing"
    );
  }
}
