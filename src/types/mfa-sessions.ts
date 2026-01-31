import type { MfaMethod, MfaSessionStatus } from "./common";

export interface VerifyMfaSessionParams {
  mfaSessionId: string;
  mfaToken: string;
  mfaMethod: MfaMethod;
}

export interface VerifyMfaSessionResponse {
  success: boolean;
  message: string;
}

export interface GetMfaSessionStatusParams {
  mfaSessionId: string;
}

export interface GetMfaSessionStatusResponse {
  status: MfaSessionStatus;
  mfaMethod: MfaMethod;
}
