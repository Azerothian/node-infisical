export interface IntegrationAuth {
  id: string;
  projectId: string;
  integration: string;
  teamId?: string | null;
  accountId?: string | null;
  url?: string | null;
  namespace?: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIntegrationAuthParams {
  projectId: string;
  integration: string;
  accessId?: string;
  accessToken?: string;
  url?: string;
  namespace?: string;
  refreshToken?: string;
}

export interface CreateIntegrationAuthResponse {
  integrationAuth: IntegrationAuth;
}

export interface GetIntegrationAuthParams {
  integrationAuthId: string;
}

export interface GetIntegrationAuthResponse {
  integrationAuth: IntegrationAuth;
}

export interface DeleteIntegrationAuthParams {
  integrationAuthId: string;
}

export interface DeleteIntegrationAuthResponse {
  integrationAuth: IntegrationAuth;
}

export interface ListIntegrationAuthParams {
  projectId: string;
}

export interface ListIntegrationAuthResponse {
  integrationAuths: IntegrationAuth[];
}
