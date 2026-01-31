import { BaseResource } from "./base";
import type {
  RenewAccessTokenParams,
  RenewAccessTokenResponse,
  RevokeAccessTokenParams,
  RevokeAccessTokenResponse,
} from "../types/identity-access-tokens";

export class IdentityAccessTokensResource extends BaseResource {
  async renew(params: RenewAccessTokenParams): Promise<RenewAccessTokenResponse> {
    return this.http.post<RenewAccessTokenResponse>(
      "/api/v1/auth/token/renew",
      params
    );
  }

  async revoke(params: RevokeAccessTokenParams): Promise<RevokeAccessTokenResponse> {
    return this.http.post<RevokeAccessTokenResponse>(
      "/api/v1/auth/token/revoke",
      params
    );
  }
}
