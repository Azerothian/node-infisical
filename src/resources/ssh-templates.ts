import { BaseResource } from "./base";
import type {
  CreateSshTemplateParams,
  CreateSshTemplateResponse,
  GetSshTemplateParams,
  GetSshTemplateResponse,
  UpdateSshTemplateParams,
  UpdateSshTemplateResponse,
  DeleteSshTemplateParams,
  DeleteSshTemplateResponse,
  ListSshTemplatesParams,
  ListSshTemplatesResponse,
} from "../types/ssh-templates";

export class SshTemplatesResource extends BaseResource {
  async create(params: CreateSshTemplateParams): Promise<CreateSshTemplateResponse> {
    return this.http.post<CreateSshTemplateResponse>(
      "/api/v1/ssh/certificate-templates",
      params
    );
  }

  async get(params: GetSshTemplateParams): Promise<GetSshTemplateResponse> {
    return this.http.get<GetSshTemplateResponse>(
      `/api/v1/ssh/certificate-templates/${encodeURIComponent(params.templateId)}`
    );
  }

  async update(params: UpdateSshTemplateParams): Promise<UpdateSshTemplateResponse> {
    const { templateId, ...body } = params;
    return this.http.patch<UpdateSshTemplateResponse>(
      `/api/v1/ssh/certificate-templates/${encodeURIComponent(templateId)}`,
      body
    );
  }

  async delete(params: DeleteSshTemplateParams): Promise<DeleteSshTemplateResponse> {
    return this.http.delete<DeleteSshTemplateResponse>(
      `/api/v1/ssh/certificate-templates/${encodeURIComponent(params.templateId)}`
    );
  }

  async list(params: ListSshTemplatesParams): Promise<ListSshTemplatesResponse> {
    return this.http.get<ListSshTemplatesResponse>(
      "/api/v1/ssh/certificate-templates",
      { ...params } as Record<string, unknown>
    );
  }
}
