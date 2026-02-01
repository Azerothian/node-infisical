import { BaseResource } from "./base";
import type {
  LoginOidcAuthParams,
  LoginOidcAuthResponse,
  AttachOidcAuthParams,
  AttachOidcAuthResponse,
  UpdateOidcAuthParams,
  UpdateOidcAuthResponse,
  GetOidcAuthParams,
  GetOidcAuthResponse,
  RevokeOidcAuthParams,
  RevokeOidcAuthResponse,
} from "../types/identity-oidc-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityOidcAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginOidcAuthParams): Promise<LoginOidcAuthResponse> {
    return this.http.postNoAuth<LoginOidcAuthResponse>(
      "/api/v1/auth/oidc-auth/login",
      params
    );
  }

  async attach(params: AttachOidcAuthParams): Promise<AttachOidcAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateOidcAuthParams): Promise<UpdateOidcAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetOidcAuthParams): Promise<GetOidcAuthResponse> {
    this.requireAuth();
    return this.http.get<GetOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeOidcAuthParams): Promise<RevokeOidcAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
