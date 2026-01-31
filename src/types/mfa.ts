import type { MfaMethod } from "./common";

export interface ResendMfaTokenResponse {
  message: string;
}

export interface CheckTotpResponse {
  isVerified: boolean;
}

export interface CheckWebAuthnResponse {
  hasPasskeys: boolean;
}

export interface VerifyMfaParams {
  mfaToken: string;
  mfaMethod?: MfaMethod;
}

export interface VerifyMfaResponse {
  encryptionVersion?: number | null;
  protectedKey?: string | null;
  protectedKeyIV?: string | null;
  protectedKeyTag?: string | null;
  publicKey?: string | null;
  encryptedPrivateKey?: string | null;
  iv?: string | null;
  tag?: string | null;
  token: string;
}

export interface VerifyMfaRecoveryCodeParams {
  recoveryCode: string;
}
