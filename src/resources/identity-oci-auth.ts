import { BaseResource } from "./base";
import type {
  LoginOciAuthParams,
  LoginOciAuthResponse,
  AttachOciAuthParams,
  AttachOciAuthResponse,
  UpdateOciAuthParams,
  UpdateOciAuthResponse,
  GetOciAuthParams,
  GetOciAuthResponse,
  RevokeOciAuthParams,
  RevokeOciAuthResponse,
} from "../types/identity-oci-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityOciAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }
  async login(params: LoginOciAuthParams): Promise<LoginOciAuthResponse> {
    return this.http.postNoAuth<LoginOciAuthResponse>(
      "/api/v1/auth/oci-auth/login",
      params
    );
  }

  async attach(params: AttachOciAuthParams): Promise<AttachOciAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateOciAuthParams): Promise<UpdateOciAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetOciAuthParams): Promise<GetOciAuthResponse> {
    this.requireAuth();
    return this.http.get<GetOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeOciAuthParams): Promise<RevokeOciAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
