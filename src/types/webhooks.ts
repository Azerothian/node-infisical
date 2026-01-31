export interface Webhook {
  id: string;
  projectId: string;
  environment: string;
  secretPath: string;
  url: string;
  isDisabled: boolean;
  lastStatus?: string | null;
  lastRunErrorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWebhookParams {
  projectId: string;
  environment: string;
  secretPath?: string;
  webhookUrl: string;
  webhookSecretKey?: string;
}

export interface CreateWebhookResponse {
  webhook: Webhook;
}

export interface UpdateWebhookParams {
  webhookId: string;
  isDisabled?: boolean;
}

export interface UpdateWebhookResponse {
  webhook: Webhook;
}

export interface DeleteWebhookParams {
  webhookId: string;
}

export interface DeleteWebhookResponse {
  webhook: Webhook;
}

export interface ListWebhooksParams {
  projectId: string;
  environment?: string;
  secretPath?: string;
}

export interface ListWebhooksResponse {
  webhooks: Webhook[];
}

export interface TestWebhookParams {
  webhookId: string;
}

export interface TestWebhookResponse {
  webhook: Webhook;
}
