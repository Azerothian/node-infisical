import { BaseResource } from "./base";
import type {
  CreateCertificateParams,
  CreateCertificateResponse,
  GetCertificateParams,
  GetCertificateResponse,
  GetCertificateBodyParams,
  GetCertificateBodyResponse,
  GetCertificateBundleParams,
  GetCertificateBundleResponse,
  GetCertificatePrivateKeyParams,
  GetCertificatePrivateKeyResponse,
  RenewCertificateParams,
  RenewCertificateResponse,
  RevokeCertificateParams,
  RevokeCertificateResponse,
  DeleteCertificateParams,
  DeleteCertificateResponse,
  UpdateCertificateConfigParams,
  UpdateCertificateConfigResponse,
} from "../types/pki-certificates";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class PkiCertificatesResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "pki");
  }

  async create(params: CreateCertificateParams): Promise<CreateCertificateResponse> {
    this.requireAuth();
    return this.http.post<CreateCertificateResponse>(
      "/api/v1/pki/certificates",
      params
    );
  }

  async get(params: GetCertificateParams): Promise<GetCertificateResponse> {
    this.requireAuth();
    return this.http.get<GetCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}`
    );
  }

  async getBody(params: GetCertificateBodyParams): Promise<GetCertificateBodyResponse> {
    this.requireAuth();
    return this.http.get<GetCertificateBodyResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/certificate`
    );
  }

  async getBundle(params: GetCertificateBundleParams): Promise<GetCertificateBundleResponse> {
    this.requireAuth();
    return this.http.get<GetCertificateBundleResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/bundle`
    );
  }

  async getPrivateKey(params: GetCertificatePrivateKeyParams): Promise<GetCertificatePrivateKeyResponse> {
    this.requireAuth();
    return this.http.get<GetCertificatePrivateKeyResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/private-key`
    );
  }

  async renew(params: RenewCertificateParams): Promise<RenewCertificateResponse> {
    this.requireAuth();
    const { certificateId, ...body } = params;
    return this.http.post<RenewCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/renew`,
      body
    );
  }

  async revoke(params: RevokeCertificateParams): Promise<RevokeCertificateResponse> {
    this.requireAuth();
    const { certificateId, ...body } = params;
    return this.http.post<RevokeCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/revoke`,
      body
    );
  }

  async delete(params: DeleteCertificateParams): Promise<DeleteCertificateResponse> {
    this.requireAuth();
    return this.http.delete<DeleteCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}`
    );
  }

  async updateConfig(params: UpdateCertificateConfigParams): Promise<UpdateCertificateConfigResponse> {
    this.requireAuth();
    const { certificateId, ...body } = params;
    return this.http.patch<UpdateCertificateConfigResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/config`,
      body
    );
  }
}
