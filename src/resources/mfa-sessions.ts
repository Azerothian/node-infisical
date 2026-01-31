import { BaseResource } from "./base";
import type {
  VerifyMfaSessionParams,
  VerifyMfaSessionResponse,
  GetMfaSessionStatusParams,
  GetMfaSessionStatusResponse,
} from "../types/mfa-sessions";

export class MfaSessionsResource extends BaseResource {
  async verify(params: VerifyMfaSessionParams): Promise<VerifyMfaSessionResponse> {
    const { mfaSessionId, ...body } = params;
    return this.http.post<VerifyMfaSessionResponse>(
      `/mfa-sessions/${encodeURIComponent(mfaSessionId)}/verify`,
      body
    );
  }

  async getStatus(params: GetMfaSessionStatusParams): Promise<GetMfaSessionStatusResponse> {
    return this.http.get<GetMfaSessionStatusResponse>(
      `/mfa-sessions/${encodeURIComponent(params.mfaSessionId)}/status`
    );
  }
}
