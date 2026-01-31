import { BaseResource } from "./base";
import type {
  LoginUniversalAuthParams,
  LoginUniversalAuthResponse,
  AttachUniversalAuthParams,
  AttachUniversalAuthResponse,
  UpdateUniversalAuthParams,
  UpdateUniversalAuthResponse,
  GetUniversalAuthParams,
  GetUniversalAuthResponse,
  RevokeUniversalAuthParams,
  RevokeUniversalAuthResponse,
  CreateUniversalAuthClientSecretParams,
  CreateUniversalAuthClientSecretResponse,
  ListUniversalAuthClientSecretsParams,
  ListUniversalAuthClientSecretsResponse,
  GetUniversalAuthClientSecretParams,
  GetUniversalAuthClientSecretResponse,
  RevokeUniversalAuthClientSecretParams,
  RevokeUniversalAuthClientSecretResponse,
} from "../types/identity-universal-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityUniversalAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginUniversalAuthParams): Promise<LoginUniversalAuthResponse> {
    return this.http.post<LoginUniversalAuthResponse>(
      "/api/v1/auth/universal-auth/login",
      params
    );
  }

  async attach(params: AttachUniversalAuthParams): Promise<AttachUniversalAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachUniversalAuthResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateUniversalAuthParams): Promise<UpdateUniversalAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateUniversalAuthResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetUniversalAuthParams): Promise<GetUniversalAuthResponse> {
    this.requireAuth();
    return this.http.get<GetUniversalAuthResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeUniversalAuthParams): Promise<RevokeUniversalAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeUniversalAuthResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async createClientSecret(params: CreateUniversalAuthClientSecretParams): Promise<CreateUniversalAuthClientSecretResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<CreateUniversalAuthClientSecretResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(identityId)}/client-secrets`,
      body
    );
  }

  async listClientSecrets(params: ListUniversalAuthClientSecretsParams): Promise<ListUniversalAuthClientSecretsResponse> {
    this.requireAuth();
    return this.http.get<ListUniversalAuthClientSecretsResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(params.identityId)}/client-secrets`
    );
  }

  async getClientSecret(params: GetUniversalAuthClientSecretParams): Promise<GetUniversalAuthClientSecretResponse> {
    this.requireAuth();
    return this.http.get<GetUniversalAuthClientSecretResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(params.identityId)}/client-secrets/${encodeURIComponent(params.clientSecretId)}`
    );
  }

  async revokeClientSecret(params: RevokeUniversalAuthClientSecretParams): Promise<RevokeUniversalAuthClientSecretResponse> {
    this.requireAuth();
    return this.http.delete<RevokeUniversalAuthClientSecretResponse>(
      `/api/v1/auth/universal-auth/identities/${encodeURIComponent(params.identityId)}/client-secrets/${encodeURIComponent(params.clientSecretId)}`
    );
  }
}
