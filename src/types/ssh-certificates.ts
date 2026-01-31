export interface SshCertificate {
  id: string;
  sshCaId: string;
  serialNumber: string;
  certType: string;
  principals: string[];
  keyId: string;
  notBefore: string;
  notAfter: string;
  signedPublicKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueSshCertificateParams {
  sshCaId: string;
  certType: string;
  principals: string[];
  keyId?: string;
  publicKey: string;
  ttl?: string;
}

export interface IssueSshCertificateResponse {
  certificate: SshCertificate;
  signedPublicKey: string;
}

export interface SignSshPublicKeyParams {
  sshCaId: string;
  publicKey: string;
  certType: string;
  principals: string[];
  keyId?: string;
  ttl?: string;
}

export interface SignSshPublicKeyResponse {
  signedPublicKey: string;
  serialNumber: string;
}

export interface GetSshCertificateParams {
  certificateId: string;
}

export interface GetSshCertificateResponse {
  certificate: SshCertificate;
}

export interface ListSshCertificatesParams {
  projectId: string;
  offset?: number;
  limit?: number;
}

export interface ListSshCertificatesResponse {
  certificates: SshCertificate[];
  totalCount: number;
}
