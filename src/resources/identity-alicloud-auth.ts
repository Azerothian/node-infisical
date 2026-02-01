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
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityAlicloudAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }
  async login(params: LoginAlicloudAuthParams): Promise<LoginAlicloudAuthResponse> {
    return this.http.postNoAuth<LoginAlicloudAuthResponse>(
      "/api/v1/auth/alicloud-auth/login",
      params
    );
  }

  async attach(params: AttachAlicloudAuthParams): Promise<AttachAlicloudAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAlicloudAuthParams): Promise<UpdateAlicloudAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAlicloudAuthParams): Promise<GetAlicloudAuthResponse> {
    this.requireAuth();
    return this.http.get<GetAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAlicloudAuthParams): Promise<RevokeAlicloudAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeAlicloudAuthResponse>(
      `/api/v1/auth/alicloud-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
