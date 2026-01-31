import { describe, it, expect } from "vitest";
import {
  InfisicalApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  InternalServerError,
  InfisicalNetworkError,
} from "../src/errors";

describe("InfisicalApiError", () => {
  it("stores status code and metadata", () => {
    const err = new InfisicalApiError("test error", {
      statusCode: 418,
      requestId: "req-123",
      errorType: "teapot",
      details: { foo: "bar" },
    });
    expect(err.message).toBe("test error");
    expect(err.statusCode).toBe(418);
    expect(err.requestId).toBe("req-123");
    expect(err.errorType).toBe("teapot");
    expect(err.details).toEqual({ foo: "bar" });
    expect(err.name).toBe("InfisicalApiError");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("Error subclasses", () => {
  const cases: Array<{
    Class: new (msg: string) => InfisicalApiError;
    expectedStatus: number;
    expectedName: string;
  }> = [
    { Class: BadRequestError, expectedStatus: 400, expectedName: "BadRequestError" },
    { Class: UnauthorizedError, expectedStatus: 401, expectedName: "UnauthorizedError" },
    { Class: ForbiddenError, expectedStatus: 403, expectedName: "ForbiddenError" },
    { Class: NotFoundError, expectedStatus: 404, expectedName: "NotFoundError" },
    { Class: ValidationError, expectedStatus: 422, expectedName: "ValidationError" },
    { Class: RateLimitError, expectedStatus: 429, expectedName: "RateLimitError" },
    { Class: InternalServerError, expectedStatus: 500, expectedName: "InternalServerError" },
  ];

  for (const { Class, expectedStatus, expectedName } of cases) {
    it(`${expectedName} has status ${expectedStatus}`, () => {
      const err = new Class("fail");
      expect(err.statusCode).toBe(expectedStatus);
      expect(err.name).toBe(expectedName);
      expect(err).toBeInstanceOf(InfisicalApiError);
      expect(err).toBeInstanceOf(Error);
    });
  }
});

describe("InfisicalNetworkError", () => {
  it("stores cause", () => {
    const cause = new TypeError("fetch failed");
    const err = new InfisicalNetworkError("Network request failed", { cause });
    expect(err.message).toBe("Network request failed");
    expect(err.cause).toBe(cause);
    expect(err.name).toBe("InfisicalNetworkError");
    expect(err).toBeInstanceOf(Error);
  });
});
