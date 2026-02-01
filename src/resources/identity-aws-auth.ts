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
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityAwsAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginAwsAuthParams): Promise<LoginAwsAuthResponse> {
    return this.http.postNoAuth<LoginAwsAuthResponse>(
      "/api/v1/auth/aws-auth/login",
      params
    );
  }

  async attach(params: AttachAwsAuthParams): Promise<AttachAwsAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAwsAuthParams): Promise<UpdateAwsAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAwsAuthParams): Promise<GetAwsAuthResponse> {
    this.requireAuth();
    return this.http.get<GetAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAwsAuthParams): Promise<RevokeAwsAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeAwsAuthResponse>(
      `/api/v1/auth/aws-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
