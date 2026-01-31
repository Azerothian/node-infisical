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
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class PkiTemplatesResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "pki");
  }

  async create(
    params: CreatePkiTemplateParams
  ): Promise<CreatePkiTemplateResponse> {
    this.requireAuth();
    return this.http.post<CreatePkiTemplateResponse>(
      "/pki/certificate-templates",
      params
    );
  }

  async update(
    params: UpdatePkiTemplateParams
  ): Promise<UpdatePkiTemplateResponse> {
    this.requireAuth();
    const { templateName, ...body } = params;
    return this.http.patch<UpdatePkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      body
    );
  }

  async delete(
    params: DeletePkiTemplateParams
  ): Promise<DeletePkiTemplateResponse> {
    this.requireAuth();
    const { templateName, ...body } = params;
    return this.http.delete<DeletePkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      body
    );
  }

  async get(
    params: GetPkiTemplateParams
  ): Promise<GetPkiTemplateResponse> {
    this.requireAuth();
    const { templateName, ...query } = params;
    return this.http.get<GetPkiTemplateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}`,
      { ...query } as Record<string, unknown>
    );
  }

  async list(
    params: ListPkiTemplatesParams
  ): Promise<ListPkiTemplatesResponse> {
    this.requireAuth();
    return this.http.get<ListPkiTemplatesResponse>(
      "/pki/certificate-templates",
      { ...params } as Record<string, unknown>
    );
  }

  async issueCertificate(
    params: IssueCertificateParams
  ): Promise<IssueCertificateResponse> {
    this.requireAuth();
    const { templateName, ...body } = params;
    return this.http.post<IssueCertificateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}/issue-certificate`,
      body
    );
  }

  async signCertificate(
    params: SignCertificateParams
  ): Promise<SignCertificateResponse> {
    this.requireAuth();
    const { templateName, ...body } = params;
    return this.http.post<SignCertificateResponse>(
      `/pki/certificate-templates/${encodeURIComponent(templateName)}/sign-certificate`,
      body
    );
  }
}
