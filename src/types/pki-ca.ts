export interface CertificateAuthority {
  id: string;
  type: string;
  name: string;
  projectId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface ListCertificateAuthoritiesParams {
  projectId: string;
}

export interface ListCertificateAuthoritiesResponse {
  certificateAuthorities: CertificateAuthority[];
}
