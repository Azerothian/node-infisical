import { BaseResource } from "./base";
import type {
  CreateAppConnectionParams,
  CreateAppConnectionResponse,
  UpdateAppConnectionParams,
  UpdateAppConnectionResponse,
  DeleteAppConnectionParams,
  DeleteAppConnectionResponse,
  GetAppConnectionParams,
  GetAppConnectionResponse,
  ListAppConnectionsParams,
  ListAppConnectionsResponse,
  GetAppConnectionByNameParams,
  GetAppConnectionByNameResponse,
  CheckAppConnectionAvailabilityParams,
  CheckAppConnectionAvailabilityResponse,
  ListAllAppConnectionsResponse,
} from "../types/app-connections";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class AppConnectionsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "appConnections");
  }

  async create(params: CreateAppConnectionParams): Promise<CreateAppConnectionResponse> {
    this.requireAuth();
    const { app, ...body } = params;
    return this.http.post<CreateAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(app)}`,
      body
    );
  }

  async update(params: UpdateAppConnectionParams): Promise<UpdateAppConnectionResponse> {
    this.requireAuth();
    const { app, connectionId, ...body } = params;
    return this.http.patch<UpdateAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(app)}/${encodeURIComponent(connectionId)}`,
      body
    );
  }

  async delete(params: DeleteAppConnectionParams): Promise<DeleteAppConnectionResponse> {
    this.requireAuth();
    return this.http.delete<DeleteAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/${encodeURIComponent(params.connectionId)}`
    );
  }

  async get(params: GetAppConnectionParams): Promise<GetAppConnectionResponse> {
    this.requireAuth();
    return this.http.get<GetAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/${encodeURIComponent(params.connectionId)}`
    );
  }

  async list(params: ListAppConnectionsParams): Promise<ListAppConnectionsResponse> {
    this.requireAuth();
    return this.http.get<ListAppConnectionsResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}`
    );
  }

  async getByName(params: GetAppConnectionByNameParams): Promise<GetAppConnectionByNameResponse> {
    this.requireAuth();
    return this.http.get<GetAppConnectionByNameResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/connection-name/${encodeURIComponent(params.connectionName)}`
    );
  }

  async checkAvailability(params: CheckAppConnectionAvailabilityParams): Promise<CheckAppConnectionAvailabilityResponse> {
    this.requireAuth();
    return this.http.get<CheckAppConnectionAvailabilityResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/available`
    );
  }

  async listAll(): Promise<ListAllAppConnectionsResponse> {
    this.requireAuth();
    return this.http.get<ListAllAppConnectionsResponse>(
      "/api/v1/app-connections/list"
    );
  }
}
