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

export class IdentityOidcAuthResource extends BaseResource {
  async login(params: LoginOidcAuthParams): Promise<LoginOidcAuthResponse> {
    return this.http.post<LoginOidcAuthResponse>(
      "/api/v1/auth/oidc-auth/login",
      params
    );
  }

  async attach(params: AttachOidcAuthParams): Promise<AttachOidcAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateOidcAuthParams): Promise<UpdateOidcAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetOidcAuthParams): Promise<GetOidcAuthResponse> {
    return this.http.get<GetOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeOidcAuthParams): Promise<RevokeOidcAuthResponse> {
    return this.http.delete<RevokeOidcAuthResponse>(
      `/api/v1/auth/oidc-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
