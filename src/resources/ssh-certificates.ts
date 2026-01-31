import { BaseResource } from "./base";
import type {
  IssueSshCertificateParams,
  IssueSshCertificateResponse,
  SignSshPublicKeyParams,
  SignSshPublicKeyResponse,
  GetSshCertificateParams,
  GetSshCertificateResponse,
  ListSshCertificatesParams,
  ListSshCertificatesResponse,
} from "../types/ssh-certificates";

export class SshCertificatesResource extends BaseResource {
  async issue(params: IssueSshCertificateParams): Promise<IssueSshCertificateResponse> {
    return this.http.post<IssueSshCertificateResponse>(
      "/api/v1/ssh/certificates/issue",
      params
    );
  }

  async sign(params: SignSshPublicKeyParams): Promise<SignSshPublicKeyResponse> {
    return this.http.post<SignSshPublicKeyResponse>(
      "/api/v1/ssh/certificates/sign",
      params
    );
  }

  async get(params: GetSshCertificateParams): Promise<GetSshCertificateResponse> {
    return this.http.get<GetSshCertificateResponse>(
      `/api/v1/ssh/certificates/${encodeURIComponent(params.certificateId)}`
    );
  }

  async list(params: ListSshCertificatesParams): Promise<ListSshCertificatesResponse> {
    return this.http.get<ListSshCertificatesResponse>(
      "/api/v1/ssh/certificates",
      { ...params } as Record<string, unknown>
    );
  }
}
