import { BaseResource } from "./base";
import type {
  ListCertificateAuthoritiesParams,
  ListCertificateAuthoritiesResponse,
  GetCaParams,
  GetCaResponse,
  CreateCaParams,
  CreateCaResponse,
  UpdateCaParams,
  UpdateCaResponse,
  DeleteCaParams,
  DeleteCaResponse,
  GetCaCsrParams,
  GetCaCsrResponse,
  GetCaCertificateParams,
  GetCaCertificateResponse,
  ListCaCertificatesParams,
  ListCaCertificatesResponse,
  GetCaCrlsParams,
  GetCaCrlsResponse,
  RenewCaParams,
  RenewCaResponse,
  SignIntermediateCaParams,
  SignIntermediateCaResponse,
} from "../types/pki-ca";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class PkiCaResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "pki");
  }

  async list(
    params: ListCertificateAuthoritiesParams
  ): Promise<ListCertificateAuthoritiesResponse> {
    this.requireAuth();
    return this.http.get<ListCertificateAuthoritiesResponse>(
      "/pki/ca",
      { ...params } as Record<string, unknown>
    );
  }

  async get(params: GetCaParams): Promise<GetCaResponse> {
    this.requireAuth();
    return this.http.get<GetCaResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}`
    );
  }

  async create(params: CreateCaParams): Promise<CreateCaResponse> {
    this.requireAuth();
    return this.http.post<CreateCaResponse>(
      "/api/v1/pki/ca",
      params
    );
  }

  async update(params: UpdateCaParams): Promise<UpdateCaResponse> {
    this.requireAuth();
    const { caId, ...body } = params;
    return this.http.patch<UpdateCaResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(caId)}`,
      body
    );
  }

  async delete(params: DeleteCaParams): Promise<DeleteCaResponse> {
    this.requireAuth();
    return this.http.delete<DeleteCaResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}`
    );
  }

  async getCsr(params: GetCaCsrParams): Promise<GetCaCsrResponse> {
    this.requireAuth();
    return this.http.get<GetCaCsrResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}/csr`
    );
  }

  async getCertificate(params: GetCaCertificateParams): Promise<GetCaCertificateResponse> {
    this.requireAuth();
    return this.http.get<GetCaCertificateResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}/certificate`
    );
  }

  async listCertificates(params: ListCaCertificatesParams): Promise<ListCaCertificatesResponse> {
    this.requireAuth();
    return this.http.get<ListCaCertificatesResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}/ca-certificates`
    );
  }

  async getCrls(params: GetCaCrlsParams): Promise<GetCaCrlsResponse> {
    this.requireAuth();
    return this.http.get<GetCaCrlsResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(params.caId)}/crls`
    );
  }

  async renew(params: RenewCaParams): Promise<RenewCaResponse> {
    this.requireAuth();
    const { caId, ...body } = params;
    return this.http.post<RenewCaResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(caId)}/renew`,
      body
    );
  }

  async signIntermediate(params: SignIntermediateCaParams): Promise<SignIntermediateCaResponse> {
    this.requireAuth();
    const { caId, ...body } = params;
    return this.http.post<SignIntermediateCaResponse>(
      `/api/v1/pki/ca/${encodeURIComponent(caId)}/sign-intermediate`,
      body
    );
  }
}
