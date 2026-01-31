import { BaseResource } from "./base";
import type {
  CreatePkiAlertParams,
  CreatePkiAlertResponse,
  ListPkiAlertsParams,
  ListPkiAlertsResponse,
  GetPkiAlertParams,
  GetPkiAlertResponse,
  UpdatePkiAlertParams,
  UpdatePkiAlertResponse,
  DeletePkiAlertParams,
  DeletePkiAlertResponse,
  ListPkiAlertCertificatesParams,
  ListPkiAlertCertificatesResponse,
  PreviewPkiAlertCertificatesParams,
  PreviewPkiAlertCertificatesResponse,
} from "../types/pki-alerts";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class PkiAlertsResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "pki");
  }

  async create(
    params: CreatePkiAlertParams
  ): Promise<CreatePkiAlertResponse> {
    this.requireAuth();
    return this.http.post<CreatePkiAlertResponse>("/pki/alerts", params);
  }

  async list(
    params: ListPkiAlertsParams
  ): Promise<ListPkiAlertsResponse> {
    this.requireAuth();
    return this.http.get<ListPkiAlertsResponse>(
      "/pki/alerts",
      { ...params } as Record<string, unknown>
    );
  }

  async get(params: GetPkiAlertParams): Promise<GetPkiAlertResponse> {
    this.requireAuth();
    return this.http.get<GetPkiAlertResponse>(
      `/pki/alerts/${encodeURIComponent(params.alertId)}`
    );
  }

  async update(
    params: UpdatePkiAlertParams
  ): Promise<UpdatePkiAlertResponse> {
    this.requireAuth();
    const { alertId, ...body } = params;
    return this.http.patch<UpdatePkiAlertResponse>(
      `/pki/alerts/${encodeURIComponent(alertId)}`,
      body
    );
  }

  async delete(
    params: DeletePkiAlertParams
  ): Promise<DeletePkiAlertResponse> {
    this.requireAuth();
    return this.http.delete<DeletePkiAlertResponse>(
      `/pki/alerts/${encodeURIComponent(params.alertId)}`
    );
  }

  async listCertificates(
    params: ListPkiAlertCertificatesParams
  ): Promise<ListPkiAlertCertificatesResponse> {
    this.requireAuth();
    const { alertId, ...query } = params;
    return this.http.get<ListPkiAlertCertificatesResponse>(
      `/pki/alerts/${encodeURIComponent(alertId)}/certificates`,
      { ...query } as Record<string, unknown>
    );
  }

  async previewCertificates(
    params: PreviewPkiAlertCertificatesParams
  ): Promise<PreviewPkiAlertCertificatesResponse> {
    this.requireAuth();
    return this.http.post<PreviewPkiAlertCertificatesResponse>(
      "/pki/alerts/preview/certificates",
      params
    );
  }
}
