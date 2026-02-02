import type { AuthConfig } from "./types/auth";

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface RenewResult {
  auth: AuthConfig;
  expiresIn: number;
}

export class AuthState {
  private _auth: AuthConfig | null = null;
  private _expiresAt: number | null = null;
  private _renewFn: (() => Promise<RenewResult>) | null = null;
  private _renewPromise: Promise<void> | null = null;

  setAuth(auth: AuthConfig, expiresIn?: number): void {
    this._auth = auth;
    this._expiresAt = expiresIn != null ? Date.now() + expiresIn * 1000 : null;
  }

  clearAuth(): void {
    this._auth = null;
    this._expiresAt = null;
    this._renewFn = null;
    this._renewPromise = null;
  }

  setRenewFn(fn: () => Promise<RenewResult>): void {
    this._renewFn = fn;
  }

  get current(): AuthConfig | null {
    return this._auth;
  }

  get isAuthenticated(): boolean {
    return this._auth !== null;
  }

  get mode(): AuthConfig["mode"] | null {
    return this._auth?.mode ?? null;
  }

  get canRenew(): boolean {
    return this._renewFn !== null;
  }

  async forceRenew(): Promise<void> {
    if (!this._renewFn) return;

    if (this._renewPromise) {
      await this._renewPromise;
      return;
    }

    this._renewPromise = this._renew();
    try {
      await this._renewPromise;
    } finally {
      this._renewPromise = null;
    }
  }

  async ensureValid(): Promise<void> {
    if (!this._auth) return;
    if (this._expiresAt === null || this._renewFn === null) return;

    if (Date.now() >= this._expiresAt - 30_000) {
      if (this._renewPromise) {
        await this._renewPromise;
        return;
      }

      this._renewPromise = this._renew();
      try {
        await this._renewPromise;
      } finally {
        this._renewPromise = null;
      }
    }
  }

  private async _renew(): Promise<void> {
    const result = await this._renewFn!();
    this.setAuth(result.auth, result.expiresIn);
  }
}
