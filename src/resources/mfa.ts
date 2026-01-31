import { BaseResource } from "./base";
import type {
  ResendMfaTokenResponse,
  CheckTotpResponse,
  CheckWebAuthnResponse,
  VerifyMfaParams,
  VerifyMfaResponse,
  VerifyMfaRecoveryCodeParams,
} from "../types/mfa";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class MfaResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "mfa");
  }
  async resendToken(): Promise<ResendMfaTokenResponse> {
    this.requireAuth();
    return this.http.post<ResendMfaTokenResponse>("/auth/mfa/send");
  }

  async checkTotp(): Promise<CheckTotpResponse> {
    this.requireAuth();
    return this.http.get<CheckTotpResponse>("/auth/mfa/check/totp");
  }

  async checkWebAuthn(): Promise<CheckWebAuthnResponse> {
    this.requireAuth();
    return this.http.get<CheckWebAuthnResponse>("/auth/mfa/check/webauthn");
  }

  async verify(params: VerifyMfaParams): Promise<VerifyMfaResponse> {
    this.requireAuth();
    return this.http.post<VerifyMfaResponse>("/auth/mfa/verify", params);
  }

  async verifyRecoveryCode(
    params: VerifyMfaRecoveryCodeParams
  ): Promise<VerifyMfaResponse> {
    this.requireAuth();
    return this.http.post<VerifyMfaResponse>(
      "/auth/mfa/verify/recovery-code",
      params
    );
  }
}
