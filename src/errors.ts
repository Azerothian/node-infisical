export class InfisicalApiError extends Error {
  readonly statusCode: number;
  readonly requestId?: string;
  readonly errorType?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: {
      statusCode: number;
      requestId?: string;
      errorType?: string;
      details?: unknown;
    }
  ) {
    super(message);
    this.name = "InfisicalApiError";
    this.statusCode = options.statusCode;
    this.requestId = options.requestId;
    this.errorType = options.errorType;
    this.details = options.details;
  }
}

type ApiErrorOptions = Omit<
  ConstructorParameters<typeof InfisicalApiError>[1],
  "statusCode"
>;

export class BadRequestError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 400, ...options });
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 401, ...options });
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 403, ...options });
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 404, ...options });
    this.name = "NotFoundError";
  }
}

export class ValidationError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 422, ...options });
    this.name = "ValidationError";
  }
}

export class RateLimitError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 429, ...options });
    this.name = "RateLimitError";
  }
}

export class InternalServerError extends InfisicalApiError {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { statusCode: 500, ...options });
    this.name = "InternalServerError";
  }
}

export class InfisicalNetworkError extends Error {
  override readonly cause?: Error;

  constructor(message: string, options?: { cause?: Error }) {
    super(message);
    this.name = "InfisicalNetworkError";
    this.cause = options?.cause;
  }
}
