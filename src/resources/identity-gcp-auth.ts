import { BaseResource } from "./base";
import type {
  LoginGcpAuthParams,
  LoginGcpAuthResponse,
  AttachGcpAuthParams,
  AttachGcpAuthResponse,
  UpdateGcpAuthParams,
  UpdateGcpAuthResponse,
  GetGcpAuthParams,
  GetGcpAuthResponse,
  RevokeGcpAuthParams,
  RevokeGcpAuthResponse,
} from "../types/identity-gcp-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityGcpAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginGcpAuthParams): Promise<LoginGcpAuthResponse> {
    return this.http.postNoAuth<LoginGcpAuthResponse>(
      "/api/v1/auth/gcp-auth/login",
      params
    );
  }

  async attach(params: AttachGcpAuthParams): Promise<AttachGcpAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateGcpAuthParams): Promise<UpdateGcpAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetGcpAuthParams): Promise<GetGcpAuthResponse> {
    this.requireAuth();
    return this.http.get<GetGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeGcpAuthParams): Promise<RevokeGcpAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
