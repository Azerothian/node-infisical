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

export class IdentityLdapAuthResource extends BaseResource {
  async login(params: LoginLdapAuthParams): Promise<LoginLdapAuthResponse> {
    return this.http.post<LoginLdapAuthResponse>(
      "/api/v1/auth/ldap-auth/login",
      params
    );
  }

  async attach(params: AttachLdapAuthParams): Promise<AttachLdapAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateLdapAuthParams): Promise<UpdateLdapAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetLdapAuthParams): Promise<GetLdapAuthResponse> {
    return this.http.get<GetLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeLdapAuthParams): Promise<RevokeLdapAuthResponse> {
    return this.http.delete<RevokeLdapAuthResponse>(
      `/api/v1/auth/ldap-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
