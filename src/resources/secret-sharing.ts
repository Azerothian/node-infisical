import { BaseResource } from "./base";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
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
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "secretSharing");
  }
  async create(params: CreateSharedSecretParams): Promise<CreateSharedSecretResponse> {
    this.requireAuth();
    return this.http.post<CreateSharedSecretResponse>(
      "/api/v1/secret-sharing",
      params
    );
  }

  async get(params: GetSharedSecretParams): Promise<GetSharedSecretResponse> {
    this.requireAuth();
    return this.http.get<GetSharedSecretResponse>(
      `/api/v1/secret-sharing/${encodeURIComponent(params.sharedSecretId)}`,
      { hashedHex: params.hashedHex }
    );
  }

  async delete(params: DeleteSharedSecretParams): Promise<DeleteSharedSecretResponse> {
    this.requireAuth();
    return this.http.delete<DeleteSharedSecretResponse>(
      `/api/v1/secret-sharing/${encodeURIComponent(params.sharedSecretId)}`
    );
  }

  async list(): Promise<ListSharedSecretsResponse> {
    this.requireAuth();
    return this.http.get<ListSharedSecretsResponse>(
      "/api/v1/secret-sharing"
    );
  }
}
