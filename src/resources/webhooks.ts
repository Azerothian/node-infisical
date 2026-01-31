import { BaseResource } from "./base";
import type {
  CreateWebhookParams,
  CreateWebhookResponse,
  UpdateWebhookParams,
  UpdateWebhookResponse,
  DeleteWebhookParams,
  DeleteWebhookResponse,
  ListWebhooksParams,
  ListWebhooksResponse,
  TestWebhookParams,
  TestWebhookResponse,
} from "../types/webhooks";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class WebhooksResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "webhooks");
  }
  async create(params: CreateWebhookParams): Promise<CreateWebhookResponse> {
    this.requireAuth();
    return this.http.post<CreateWebhookResponse>(
      "/api/v1/webhooks",
      params
    );
  }

  async update(params: UpdateWebhookParams): Promise<UpdateWebhookResponse> {
    this.requireAuth();
    const { webhookId, ...body } = params;
    return this.http.patch<UpdateWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(webhookId)}`,
      body
    );
  }

  async delete(params: DeleteWebhookParams): Promise<DeleteWebhookResponse> {
    this.requireAuth();
    return this.http.delete<DeleteWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(params.webhookId)}`
    );
  }

  async list(params: ListWebhooksParams): Promise<ListWebhooksResponse> {
    this.requireAuth();
    return this.http.get<ListWebhooksResponse>(
      "/api/v1/webhooks",
      { ...params } as Record<string, unknown>
    );
  }

  async test(params: TestWebhookParams): Promise<TestWebhookResponse> {
    this.requireAuth();
    return this.http.post<TestWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(params.webhookId)}/test`
    );
  }
}
