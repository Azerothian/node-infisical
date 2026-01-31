import {
  InfisicalApiError,
  InfisicalNetworkError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  InternalServerError,
} from "./errors";
import type { AuthConfig } from "./types/auth";
import type { AuthState } from "./auth-state";

export type FetchFunction = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export interface HttpClientConfig {
  baseUrl: string;
  authState: AuthState;
  fetch: FetchFunction;
  timeout: number;
  headers?: Record<string, string>;
}

function buildQueryString(params?: Record<string, unknown>): string {
  if (!params) return "";
  const entries: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        entries.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
        );
      }
    } else {
      entries.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  }
  return entries.length > 0 ? `?${entries.join("&")}` : "";
}

function getAuthHeader(auth: AuthConfig): Record<string, string> {
  switch (auth.mode) {
    case "jwt":
      return { Authorization: `Bearer ${auth.token}` };
    case "apiKey":
      return { "X-API-KEY": auth.apiKey };
    case "serviceToken":
      return { Authorization: `Bearer ${auth.serviceToken}` };
    case "identityAccessToken":
      return { Authorization: `Bearer ${auth.accessToken}` };
  }
}

function createApiError(
  statusCode: number,
  body: Record<string, unknown> | null,
  requestId?: string
): InfisicalApiError {
  const message =
    (body?.["message"] as string) ??
    (body?.["error"] as string) ??
    `Request failed with status ${statusCode}`;
  const opts = {
    requestId,
    errorType: body?.["type"] as string | undefined,
    details: (body?.["details"] as unknown) ?? body,
  };
  switch (statusCode) {
    case 400:
      return new BadRequestError(message, opts);
    case 401:
      return new UnauthorizedError(message, opts);
    case 403:
      return new ForbiddenError(message, opts);
    case 404:
      return new NotFoundError(message, opts);
    case 422:
      return new ValidationError(message, opts);
    case 429:
      return new RateLimitError(message, opts);
    case 500:
      return new InternalServerError(message, opts);
    default:
      return new InfisicalApiError(message, { statusCode, ...opts });
  }
}

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AbortError" ||
      (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError"))
  );
}

export class HttpClient {
  private readonly config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  }

  private async request<T>(
    method: string,
    path: string,
    options?: {
      body?: unknown;
      query?: Record<string, unknown>;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    await this.config.authState.ensureValid();
    const prefix = path.startsWith("/api/") ? "" : "/api/v2";
    const url = `${this.config.baseUrl}${prefix}${path}${buildQueryString(options?.query)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(this.config.authState.current ? getAuthHeader(this.config.authState.current) : {}),
      ...this.config.headers,
      ...options?.headers,
    };

    let response: Response;
    try {
      response = await this.config.fetch(url, {
        method,
        headers,
        body:
          options?.body !== undefined
            ? JSON.stringify(options.body)
            : undefined,
        signal: controller.signal,
      });
    } catch (error: unknown) {
      if (isAbortError(error)) {
        throw new InfisicalNetworkError(
          `Request timed out after ${this.config.timeout}ms`,
          { cause: error as Error }
        );
      }
      throw new InfisicalNetworkError("Network request failed", {
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const requestId = response.headers.get("x-request-id") ?? undefined;

    if (!response.ok) {
      let body: Record<string, unknown> | null = null;
      try {
        body = (await response.json()) as Record<string, unknown>;
      } catch {
        const text = await response.text().catch(() => "Unknown error");
        body = { message: text };
      }
      throw createApiError(response.status, body, requestId);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  }

  async get<T>(path: string, query?: Record<string, unknown>): Promise<T> {
    return this.request<T>("GET", path, { query });
  }

  async post<T>(
    path: string,
    body?: unknown,
    query?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>("POST", path, { body, query });
  }

  async put<T>(
    path: string,
    body?: unknown,
    query?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>("PUT", path, { body, query });
  }

  async patch<T>(
    path: string,
    body?: unknown,
    query?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>("PATCH", path, { body, query });
  }

  async delete<T>(
    path: string,
    body?: unknown,
    query?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>("DELETE", path, { body, query });
  }
}
