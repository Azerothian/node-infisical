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

export class IdentityJwtAuthResource extends BaseResource {
  async login(params: LoginJwtAuthParams): Promise<LoginJwtAuthResponse> {
    return this.http.post<LoginJwtAuthResponse>(
      "/api/v1/auth/jwt-auth/login",
      params
    );
  }

  async attach(params: AttachJwtAuthParams): Promise<AttachJwtAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateJwtAuthParams): Promise<UpdateJwtAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetJwtAuthParams): Promise<GetJwtAuthResponse> {
    return this.http.get<GetJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeJwtAuthParams): Promise<RevokeJwtAuthResponse> {
    return this.http.delete<RevokeJwtAuthResponse>(
      `/api/v1/auth/jwt-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
