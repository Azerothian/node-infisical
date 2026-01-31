import { BaseResource } from "./base";
import type {
  ResendMfaTokenResponse,
  CheckTotpResponse,
  CheckWebAuthnResponse,
  VerifyMfaParams,
  VerifyMfaResponse,
  VerifyMfaRecoveryCodeParams,
} from "../types/mfa";

export class MfaResource extends BaseResource {
  async resendToken(): Promise<ResendMfaTokenResponse> {
    return this.http.post<ResendMfaTokenResponse>("/auth/mfa/send");
  }

  async checkTotp(): Promise<CheckTotpResponse> {
    return this.http.get<CheckTotpResponse>("/auth/mfa/check/totp");
  }

  async checkWebAuthn(): Promise<CheckWebAuthnResponse> {
    return this.http.get<CheckWebAuthnResponse>("/auth/mfa/check/webauthn");
  }

  async verify(params: VerifyMfaParams): Promise<VerifyMfaResponse> {
    return this.http.post<VerifyMfaResponse>("/auth/mfa/verify", params);
  }

  async verifyRecoveryCode(
    params: VerifyMfaRecoveryCodeParams
  ): Promise<VerifyMfaResponse> {
    return this.http.post<VerifyMfaResponse>(
      "/auth/mfa/verify/recovery-code",
      params
    );
  }
}
