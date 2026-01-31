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

export class IdentityOciAuthResource extends BaseResource {
  async login(params: LoginOciAuthParams): Promise<LoginOciAuthResponse> {
    return this.http.post<LoginOciAuthResponse>(
      "/api/v1/auth/oci-auth/login",
      params
    );
  }

  async attach(params: AttachOciAuthParams): Promise<AttachOciAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateOciAuthParams): Promise<UpdateOciAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetOciAuthParams): Promise<GetOciAuthResponse> {
    return this.http.get<GetOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeOciAuthParams): Promise<RevokeOciAuthResponse> {
    return this.http.delete<RevokeOciAuthResponse>(
      `/api/v1/auth/oci-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
