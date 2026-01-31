import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";
import type { ResourceCategory } from "../types/auth-modes";
import { RESOURCE_AUTH_MODES } from "../types/auth-modes";
import { AuthenticationError } from "../errors";

export abstract class BaseResource {
  protected readonly http: HttpClient;
  protected readonly authState: AuthState;
  private readonly authCategory: ResourceCategory;

  constructor(http: HttpClient, authState: AuthState, authCategory: ResourceCategory) {
    this.http = http;
    this.authState = authState;
    this.authCategory = authCategory;
  }

  protected requireAuth(): void {
    const mode = this.authState.mode;
    if (!mode) {
      throw new AuthenticationError(
        "Not authenticated. Call client.login() first.",
        { currentMode: null, allowedModes: RESOURCE_AUTH_MODES[this.authCategory] }
      );
    }
    const allowed = RESOURCE_AUTH_MODES[this.authCategory];
    if (!allowed.includes(mode)) {
      throw new AuthenticationError(
        `Auth mode "${mode}" is not allowed for ${this.authCategory}. Allowed modes: ${allowed.join(", ")}`,
        { currentMode: mode, allowedModes: allowed }
      );
    }
  }
}
