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

export class WebhooksResource extends BaseResource {
  async create(params: CreateWebhookParams): Promise<CreateWebhookResponse> {
    return this.http.post<CreateWebhookResponse>(
      "/api/v1/webhooks",
      params
    );
  }

  async update(params: UpdateWebhookParams): Promise<UpdateWebhookResponse> {
    const { webhookId, ...body } = params;
    return this.http.patch<UpdateWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(webhookId)}`,
      body
    );
  }

  async delete(params: DeleteWebhookParams): Promise<DeleteWebhookResponse> {
    return this.http.delete<DeleteWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(params.webhookId)}`
    );
  }

  async list(params: ListWebhooksParams): Promise<ListWebhooksResponse> {
    return this.http.get<ListWebhooksResponse>(
      "/api/v1/webhooks",
      { ...params } as Record<string, unknown>
    );
  }

  async test(params: TestWebhookParams): Promise<TestWebhookResponse> {
    return this.http.post<TestWebhookResponse>(
      `/api/v1/webhooks/${encodeURIComponent(params.webhookId)}/test`
    );
  }
}
