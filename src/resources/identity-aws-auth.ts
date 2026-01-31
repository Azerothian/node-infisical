import { BaseResource } from "./base";
import type {
  LoginAwsAuthParams,
  LoginAwsAuthResponse,
  AttachAwsAuthParams,
  AttachAwsAuthResponse,
  UpdateAwsAuthParams,
  UpdateAwsAuthResponse,
  GetAwsAuthParams,
  GetAwsAuthResponse,
  RevokeAwsAuthParams,
  RevokeAwsAuthResponse,
} from "../types/identity-aws-auth";

export class IdentityAwsAuthResource extends BaseResource {
  async login(params: LoginAwsAuthParams): Promise<LoginAwsAuthResponse> {
    return this.http.post<LoginAwsAuthResponse>(
      "/api/v1/auth/aws-auth/login",
      params
    );
  }

  async attach(params: AttachAwsAuthParams): Promise<AttachAwsAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAwsAuthParams): Promise<UpdateAwsAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAwsAuthParams): Promise<GetAwsAuthResponse> {
    return this.http.get<GetAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAwsAuthParams): Promise<RevokeAwsAuthResponse> {
    return this.http.delete<RevokeAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
