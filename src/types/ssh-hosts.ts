export interface SshHost {
  id: string;
  projectId: string;
  hostname: string;
  userCertTtl?: string | null;
  hostCertTtl?: string | null;
  userSshCaId?: string | null;
  hostSshCaId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSshHostParams {
  projectId: string;
  hostname: string;
  userCertTtl?: string;
  hostCertTtl?: string;
  userSshCaId?: string;
  hostSshCaId?: string;
}

export interface CreateSshHostResponse {
  host: SshHost;
}

export interface GetSshHostParams {
  hostId: string;
}

export interface GetSshHostResponse {
  host: SshHost;
}

export interface UpdateSshHostParams {
  hostId: string;
  hostname?: string;
  userCertTtl?: string;
  hostCertTtl?: string;
  userSshCaId?: string;
  hostSshCaId?: string;
}

export interface UpdateSshHostResponse {
  host: SshHost;
}

export interface DeleteSshHostParams {
  hostId: string;
}

export interface DeleteSshHostResponse {
  host: SshHost;
}

export interface ListSshHostsParams {
  projectId: string;
}

export interface ListSshHostsResponse {
  hosts: SshHost[];
}
