import { BaseResource } from "./base";
import type {
  ResetPasswordParams,
  ResetPasswordAuthenticatedParams,
} from "../types/password";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class PasswordResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "password");
  }
  async reset(params: ResetPasswordParams): Promise<void> {
    this.requireAuth();
    await this.http.post("/password/password-reset", params);
  }

  async resetAuthenticated(
    params: ResetPasswordAuthenticatedParams
  ): Promise<void> {
    this.requireAuth();
    await this.http.post("/password/user/password-reset", params);
  }
}
