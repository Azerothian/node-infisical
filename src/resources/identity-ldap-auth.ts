import { BaseResource } from "./base";
import type {
  LoginLdapAuthParams,
  LoginLdapAuthResponse,
  AttachLdapAuthParams,
  AttachLdapAuthResponse,
  UpdateLdapAuthParams,
  UpdateLdapAuthResponse,
  GetLdapAuthParams,
  GetLdapAuthResponse,
  RevokeLdapAuthParams,
  RevokeLdapAuthResponse,
} from "../types/identity-ldap-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityLdapAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }
  async login(params: LoginLdapAuthParams): Promise<LoginLdapAuthResponse> {
    return this.http.post<LoginLdapAuthResponse>(
      "/api/v1/auth/ldap-auth/login",
      params
    );
  }

  async attach(params: AttachLdapAuthParams): Promise<AttachLdapAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateLdapAuthParams): Promise<UpdateLdapAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetLdapAuthParams): Promise<GetLdapAuthResponse> {
    this.requireAuth();
    return this.http.get<GetLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeLdapAuthParams): Promise<RevokeLdapAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
