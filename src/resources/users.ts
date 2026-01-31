import { BaseResource } from "./base";
import type {
  SendEmailVerificationCodeParams,
  VerifyEmailVerificationCodeParams,
  UpdateMfaParams,
  UpdateMfaResponse,
  UpdateNameParams,
  UpdateNameResponse,
  UpdateAuthMethodsParams,
  UpdateAuthMethodsResponse,
  RequestEmailChangeOtpParams,
  RequestEmailChangeOtpResponse,
  UpdateEmailParams,
  UpdateEmailResponse,
  ListOrganizationsResponse,
  ApiKey,
  CreateApiKeyParams,
  CreateApiKeyResponse,
  DeleteApiKeyResponse,
  AuthTokenSession,
  RevokeAllSessionsResponse,
  RevokeSessionResponse,
  GetMeResponse,
  DeleteMeResponse,
} from "../types/users";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class UsersResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "users");
  }
  async sendEmailVerificationCode(
    params: SendEmailVerificationCodeParams
  ): Promise<void> {
    this.requireAuth();
    await this.http.post("/users/me/emails/code", params);
  }

  async verifyEmailVerificationCode(
    params: VerifyEmailVerificationCodeParams
  ): Promise<void> {
    this.requireAuth();
    await this.http.post("/users/me/emails/verify", params);
  }

  async updateMfa(params: UpdateMfaParams): Promise<UpdateMfaResponse> {
    this.requireAuth();
    return this.http.patch<UpdateMfaResponse>("/users/me/mfa", params);
  }

  async updateName(params: UpdateNameParams): Promise<UpdateNameResponse> {
    this.requireAuth();
    return this.http.patch<UpdateNameResponse>("/users/me/name", params);
  }

  async updateAuthMethods(
    params: UpdateAuthMethodsParams
  ): Promise<UpdateAuthMethodsResponse> {
    this.requireAuth();
    return this.http.put<UpdateAuthMethodsResponse>(
      "/users/me/auth-methods",
      params
    );
  }

  async requestEmailChangeOtp(
    params: RequestEmailChangeOtpParams
  ): Promise<RequestEmailChangeOtpResponse> {
    this.requireAuth();
    return this.http.post<RequestEmailChangeOtpResponse>(
      "/users/me/email-change/otp",
      params
    );
  }

  async updateEmail(params: UpdateEmailParams): Promise<UpdateEmailResponse> {
    this.requireAuth();
    return this.http.patch<UpdateEmailResponse>("/users/me/email", params);
  }

  async listOrganizations(): Promise<ListOrganizationsResponse> {
    this.requireAuth();
    return this.http.get<ListOrganizationsResponse>(
      "/users/me/organizations"
    );
  }

  async listApiKeys(): Promise<ApiKey[]> {
    this.requireAuth();
    return this.http.get<ApiKey[]>("/users/me/api-keys");
  }

  async createApiKey(
    params: CreateApiKeyParams
  ): Promise<CreateApiKeyResponse> {
    this.requireAuth();
    return this.http.post<CreateApiKeyResponse>("/users/me/api-keys", params);
  }

  async deleteApiKey(apiKeyDataId: string): Promise<DeleteApiKeyResponse> {
    this.requireAuth();
    return this.http.delete<DeleteApiKeyResponse>(
      `/users/me/api-keys/${encodeURIComponent(apiKeyDataId)}`
    );
  }

  async listSessions(): Promise<AuthTokenSession[]> {
    this.requireAuth();
    return this.http.get<AuthTokenSession[]>("/users/me/sessions");
  }

  async revokeAllSessions(): Promise<RevokeAllSessionsResponse> {
    this.requireAuth();
    return this.http.delete<RevokeAllSessionsResponse>("/users/me/sessions");
  }

  async revokeSession(sessionId: string): Promise<RevokeSessionResponse> {
    this.requireAuth();
    return this.http.delete<RevokeSessionResponse>(
      `/users/me/sessions/${encodeURIComponent(sessionId)}`
    );
  }

  async getMe(): Promise<GetMeResponse> {
    this.requireAuth();
    return this.http.get<GetMeResponse>("/users/me");
  }

  async deleteMe(): Promise<DeleteMeResponse> {
    this.requireAuth();
    return this.http.delete<DeleteMeResponse>("/users/me");
  }
}
