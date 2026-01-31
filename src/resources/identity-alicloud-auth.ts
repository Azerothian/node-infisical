import { BaseResource } from "./base";
import type {
  LoginAlicloudAuthParams,
  LoginAlicloudAuthResponse,
  AttachAlicloudAuthParams,
  AttachAlicloudAuthResponse,
  UpdateAlicloudAuthParams,
  UpdateAlicloudAuthResponse,
  GetAlicloudAuthParams,
  GetAlicloudAuthResponse,
  RevokeAlicloudAuthParams,
  RevokeAlicloudAuthResponse,
} from "../types/identity-alicloud-auth";

export class IdentityAlicloudAuthResource extends BaseResource {
  async login(params: LoginAlicloudAuthParams): Promise<LoginAlicloudAuthResponse> {
    return this.http.post<LoginAlicloudAuthResponse>(
      "/api/v1/auth/alicloud-auth/login",
      params
    );
  }

  async attach(params: AttachAlicloudAuthParams): Promise<AttachAlicloudAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAlicloudAuthParams): Promise<UpdateAlicloudAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAlicloudAuthParams): Promise<GetAlicloudAuthResponse> {
    return this.http.get<GetAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAlicloudAuthParams): Promise<RevokeAlicloudAuthResponse> {
    return this.http.delete<RevokeAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
