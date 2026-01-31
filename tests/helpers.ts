import { vi } from "vitest";

export interface MockResponse {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Map<string, string>;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
}

export function createMockFetch(
  responses: Array<{
    status?: number;
    body?: unknown;
    headers?: Record<string, string>;
  }> = []
) {
  let callIndex = 0;
  const calls: Array<{ url: string; init: RequestInit }> = [];

  const mockFetch = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const response = responses[callIndex] ?? { status: 200, body: {} };
    callIndex++;

    const urlStr = typeof url === "string" ? url : url instanceof URL ? url.toString() : url.url;
    calls.push({ url: urlStr, init: init ?? {} });

    const headerMap = new Map(
      Object.entries(response.headers ?? {})
    );

    return {
      ok: (response.status ?? 200) >= 200 && (response.status ?? 200) < 300,
      status: response.status ?? 200,
      statusText: "OK",
      headers: {
        get: (name: string) => headerMap.get(name) ?? null,
      },
      json: async () => response.body,
      text: async () => JSON.stringify(response.body),
    } as unknown as Response;
  });

  return { mockFetch, calls };
}

export function createErrorFetch(error: Error) {
  return vi.fn(async () => {
    throw error;
  });
}
