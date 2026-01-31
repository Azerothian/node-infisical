import { BaseResource } from "./base";
import type {
  RenewAccessTokenParams,
  RenewAccessTokenResponse,
  RevokeAccessTokenParams,
  RevokeAccessTokenResponse,
} from "../types/identity-access-tokens";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityAccessTokensResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAccessTokens");
  }

  async renew(params: RenewAccessTokenParams): Promise<RenewAccessTokenResponse> {
    this.requireAuth();
    return this.http.post<RenewAccessTokenResponse>(
      "/api/v1/auth/token/renew",
      params
    );
  }

  async revoke(params: RevokeAccessTokenParams): Promise<RevokeAccessTokenResponse> {
    this.requireAuth();
    return this.http.post<RevokeAccessTokenResponse>(
      "/api/v1/auth/token/revoke",
      params
    );
  }
}
