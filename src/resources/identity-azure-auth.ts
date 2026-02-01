import { BaseResource } from "./base";
import type {
  LoginAzureAuthParams,
  LoginAzureAuthResponse,
  AttachAzureAuthParams,
  AttachAzureAuthResponse,
  UpdateAzureAuthParams,
  UpdateAzureAuthResponse,
  GetAzureAuthParams,
  GetAzureAuthResponse,
  RevokeAzureAuthParams,
  RevokeAzureAuthResponse,
} from "../types/identity-azure-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityAzureAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginAzureAuthParams): Promise<LoginAzureAuthResponse> {
    return this.http.postNoAuth<LoginAzureAuthResponse>(
      "/api/v1/auth/azure-auth/login",
      params
    );
  }

  async attach(params: AttachAzureAuthParams): Promise<AttachAzureAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAzureAuthParams): Promise<UpdateAzureAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAzureAuthParams): Promise<GetAzureAuthResponse> {
    this.requireAuth();
    return this.http.get<GetAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAzureAuthParams): Promise<RevokeAzureAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
