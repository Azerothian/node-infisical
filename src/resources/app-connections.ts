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
} from "../types/app-connections";

export class AppConnectionsResource extends BaseResource {
  async create(params: CreateAppConnectionParams): Promise<CreateAppConnectionResponse> {
    const { app, ...body } = params;
    return this.http.post<CreateAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(app)}`,
      body
    );
  }

  async update(params: UpdateAppConnectionParams): Promise<UpdateAppConnectionResponse> {
    const { app, connectionId, ...body } = params;
    return this.http.patch<UpdateAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(app)}/${encodeURIComponent(connectionId)}`,
      body
    );
  }

  async delete(params: DeleteAppConnectionParams): Promise<DeleteAppConnectionResponse> {
    return this.http.delete<DeleteAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/${encodeURIComponent(params.connectionId)}`
    );
  }

  async get(params: GetAppConnectionParams): Promise<GetAppConnectionResponse> {
    return this.http.get<GetAppConnectionResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}/${encodeURIComponent(params.connectionId)}`
    );
  }

  async list(params: ListAppConnectionsParams): Promise<ListAppConnectionsResponse> {
    return this.http.get<ListAppConnectionsResponse>(
      `/api/v1/app-connections/${encodeURIComponent(params.app)}`
    );
  }
}
