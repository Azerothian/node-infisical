export interface SshTemplate {
  id: string;
  sshCaId: string;
  name: string;
  ttl: string;
  maxTTL: string;
  allowedUsers: string[];
  allowedHosts: string[];
  allowCustomKeyIds: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSshTemplateParams {
  sshCaId: string;
  name: string;
  ttl: string;
  maxTTL?: string;
  allowedUsers?: string[];
  allowedHosts?: string[];
  allowCustomKeyIds?: boolean;
}

export interface CreateSshTemplateResponse {
  template: SshTemplate;
}

export interface GetSshTemplateParams {
  templateId: string;
}

export interface GetSshTemplateResponse {
  template: SshTemplate;
}

export interface UpdateSshTemplateParams {
  templateId: string;
  name?: string;
  ttl?: string;
  maxTTL?: string;
  allowedUsers?: string[];
  allowedHosts?: string[];
  allowCustomKeyIds?: boolean;
}

export interface UpdateSshTemplateResponse {
  template: SshTemplate;
}

export interface DeleteSshTemplateParams {
  templateId: string;
}

export interface DeleteSshTemplateResponse {
  template: SshTemplate;
}

export interface ListSshTemplatesParams {
  sshCaId: string;
}

export interface ListSshTemplatesResponse {
  templates: SshTemplate[];
}
