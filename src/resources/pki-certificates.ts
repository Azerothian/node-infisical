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

export class PkiCertificatesResource extends BaseResource {
  async create(params: CreateCertificateParams): Promise<CreateCertificateResponse> {
    return this.http.post<CreateCertificateResponse>(
      "/api/v1/pki/certificates",
      params
    );
  }

  async get(params: GetCertificateParams): Promise<GetCertificateResponse> {
    return this.http.get<GetCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}`
    );
  }

  async getBody(params: GetCertificateBodyParams): Promise<GetCertificateBodyResponse> {
    return this.http.get<GetCertificateBodyResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/certificate`
    );
  }

  async getBundle(params: GetCertificateBundleParams): Promise<GetCertificateBundleResponse> {
    return this.http.get<GetCertificateBundleResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/bundle`
    );
  }

  async getPrivateKey(params: GetCertificatePrivateKeyParams): Promise<GetCertificatePrivateKeyResponse> {
    return this.http.get<GetCertificatePrivateKeyResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}/private-key`
    );
  }

  async renew(params: RenewCertificateParams): Promise<RenewCertificateResponse> {
    const { certificateId, ...body } = params;
    return this.http.post<RenewCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/renew`,
      body
    );
  }

  async revoke(params: RevokeCertificateParams): Promise<RevokeCertificateResponse> {
    const { certificateId, ...body } = params;
    return this.http.post<RevokeCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/revoke`,
      body
    );
  }

  async delete(params: DeleteCertificateParams): Promise<DeleteCertificateResponse> {
    return this.http.delete<DeleteCertificateResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(params.certificateId)}`
    );
  }

  async updateConfig(params: UpdateCertificateConfigParams): Promise<UpdateCertificateConfigResponse> {
    const { certificateId, ...body } = params;
    return this.http.patch<UpdateCertificateConfigResponse>(
      `/api/v1/pki/certificates/${encodeURIComponent(certificateId)}/config`,
      body
    );
  }
}
