export interface AppConnection {
  id: string;
  name: string;
  description?: string | null;
  app: string;
  orgId: string;
  method: string;
  credentials: Record<string, unknown>;
  isPlatformManaged: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppConnectionParams {
  app: string;
  name: string;
  description?: string;
  method: string;
  credentials: Record<string, unknown>;
}

export interface CreateAppConnectionResponse {
  appConnection: AppConnection;
}

export interface UpdateAppConnectionParams {
  app: string;
  connectionId: string;
  name?: string;
  description?: string;
  credentials?: Record<string, unknown>;
}

export interface UpdateAppConnectionResponse {
  appConnection: AppConnection;
}

export interface DeleteAppConnectionParams {
  app: string;
  connectionId: string;
}

export interface DeleteAppConnectionResponse {
  appConnection: AppConnection;
}

export interface GetAppConnectionParams {
  app: string;
  connectionId: string;
}

export interface GetAppConnectionResponse {
  appConnection: AppConnection;
}

export interface ListAppConnectionsParams {
  app: string;
}

export interface ListAppConnectionsResponse {
  appConnections: AppConnection[];
}

export interface GetAppConnectionByNameParams {
  app: string;
  connectionName: string;
}

export interface GetAppConnectionByNameResponse {
  appConnection: AppConnection;
}

export interface CheckAppConnectionAvailabilityParams {
  app: string;
}

export interface CheckAppConnectionAvailabilityResponse {
  available: boolean;
}

export interface ListAllAppConnectionsResponse {
  appConnections: AppConnection[];
}
