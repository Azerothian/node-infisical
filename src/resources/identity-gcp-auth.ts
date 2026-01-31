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

export class IdentityGcpAuthResource extends BaseResource {
  async login(params: LoginGcpAuthParams): Promise<LoginGcpAuthResponse> {
    return this.http.post<LoginGcpAuthResponse>(
      "/api/v1/auth/gcp-auth/login",
      params
    );
  }

  async attach(params: AttachGcpAuthParams): Promise<AttachGcpAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateGcpAuthParams): Promise<UpdateGcpAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetGcpAuthParams): Promise<GetGcpAuthResponse> {
    return this.http.get<GetGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeGcpAuthParams): Promise<RevokeGcpAuthResponse> {
    return this.http.delete<RevokeGcpAuthResponse>(
      `/api/v1/auth/gcp-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
