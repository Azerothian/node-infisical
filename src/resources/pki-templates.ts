import { BaseResource } from "./base";
import type {
  CreatePkiTemplateParams,
  CreatePkiTemplateResponse,
  UpdatePkiTemplateParams,
  UpdatePkiTemplateResponse,
  DeletePkiTemplateParams,
  DeletePkiTemplateResponse,
  GetPkiTemplateParams,
  GetPkiTemplateResponse,
  ListPkiTemplatesParams,
  ListPkiTemplatesResponse,
  IssueCertificateParams,
  IssueCertificateResponse,
  SignCertificateParams,
  SignCertificateResponse,
} from "../types/pki-templates";

export class PkiTemplatesResource extends BaseResource {
  async create(
    params: CreatePkiTemplateParams
  ): Promise<CreatePkiTemplateResponse> {
    return this.http.post<CreatePkiTemplateResponse>(
      "/pki/certificate-templates",
      params
    );
  }

  async update(
    params: UpdatePkiTemplateParams
  ): Promise<UpdatePkiTemplateResponse> {
    const { templateName, ...body } = params;
    return this.http.patch<UpdatePkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      body
    );
  }

  async delete(
    params: DeletePkiTemplateParams
  ): Promise<DeletePkiTemplateResponse> {
    const { templateName, ...body } = params;
    return this.http.delete<DeletePkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      body
    );
  }

  async get(
    params: GetPkiTemplateParams
  ): Promise<GetPkiTemplateResponse> {
    const { templateName, ...query } = params;
    return this.http.get<GetPkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async list(
    params: ListPkiTemplatesParams
  ): Promise<ListPkiTemplatesResponse> {
    return this.http.get<ListPkiTemplatesResponse>(
      "/pki/certificate-templates",
      { ...params } as Record<string, unknown>
    );
  }

  async issueCertificate(
    params: IssueCertificateParams
  ): Promise<IssueCertificateResponse> {
    const { templateName, ...body } = params;
    return this.http.post<IssueCertificateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}/issue-certificate`,
      body
    );
  }

  async signCertificate(
    params: SignCertificateParams
  ): Promise<SignCertificateResponse> {
    const { templateName, ...body } = params;
    return this.http.post<SignCertificateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}/sign-certificate`,
      body
    );
  }
}
