export interface SshCa {
  id: string;
  projectId: string;
  friendlyName: string;
  status: string;
  keyAlgorithm: string;
  publicKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSshCaParams {
  projectId: string;
  friendlyName: string;
  keyAlgorithm?: string;
}

export interface CreateSshCaResponse {
  ca: SshCa;
}

export interface GetSshCaParams {
  caId: string;
}

export interface GetSshCaResponse {
  ca: SshCa;
}

export interface UpdateSshCaParams {
  caId: string;
  friendlyName?: string;
  status?: string;
}

export interface UpdateSshCaResponse {
  ca: SshCa;
}

export interface DeleteSshCaParams {
  caId: string;
}

export interface DeleteSshCaResponse {
  ca: SshCa;
}

export interface ListSshCasParams {
  projectId: string;
}

export interface ListSshCasResponse {
  cas: SshCa[];
}

export interface GetSshCaPublicKeyParams {
  caId: string;
}

export type GetSshCaPublicKeyResponse = string;
