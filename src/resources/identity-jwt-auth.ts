import { BaseResource } from "./base";
import type {
  LoginJwtAuthParams,
  LoginJwtAuthResponse,
  AttachJwtAuthParams,
  AttachJwtAuthResponse,
  UpdateJwtAuthParams,
  UpdateJwtAuthResponse,
  GetJwtAuthParams,
  GetJwtAuthResponse,
  RevokeJwtAuthParams,
  RevokeJwtAuthResponse,
} from "../types/identity-jwt-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityJwtAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginJwtAuthParams): Promise<LoginJwtAuthResponse> {
    return this.http.postNoAuth<LoginJwtAuthResponse>(
      "/api/v1/auth/jwt-auth/login",
      params
    );
  }

  async attach(params: AttachJwtAuthParams): Promise<AttachJwtAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateJwtAuthParams): Promise<UpdateJwtAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetJwtAuthParams): Promise<GetJwtAuthResponse> {
    this.requireAuth();
    return this.http.get<GetJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeJwtAuthParams): Promise<RevokeJwtAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
