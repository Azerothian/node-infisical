import { BaseResource } from "./base";
import type {
  VerifyMfaSessionParams,
  VerifyMfaSessionResponse,
  GetMfaSessionStatusParams,
  GetMfaSessionStatusResponse,
} from "../types/mfa-sessions";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class MfaSessionsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "mfaSessions");
  }
  async verify(params: VerifyMfaSessionParams): Promise<VerifyMfaSessionResponse> {
    this.requireAuth();
    const { mfaSessionId, ...body } = params;
    return this.http.post<VerifyMfaSessionResponse>(
      `/mfa-sessions/${encodeURIComponent(mfaSessionId)}/verify`,
      body
    );
  }

  async getStatus(params: GetMfaSessionStatusParams): Promise<GetMfaSessionStatusResponse> {
    this.requireAuth();
    return this.http.get<GetMfaSessionStatusResponse>(
      `/mfa-sessions/${encodeURIComponent(params.mfaSessionId)}/status`
    );
  }
}
