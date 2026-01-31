import { BaseResource } from "./base";
import type {
  ResetPasswordParams,
  ResetPasswordAuthenticatedParams,
} from "../types/password";

export class PasswordResource extends BaseResource {
  async reset(params: ResetPasswordParams): Promise<void> {
    await this.http.post("/password/password-reset", params);
  }

  async resetAuthenticated(
    params: ResetPasswordAuthenticatedParams
  ): Promise<void> {
    await this.http.post("/password/user/password-reset", params);
  }
}
