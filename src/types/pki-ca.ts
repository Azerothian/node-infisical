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

export interface GetCaParams {
  caId: string;
}

export interface GetCaResponse {
  ca: CertificateAuthority;
}

export interface CreateCaParams {
  projectSlug: string;
  type: string;
  friendlyName?: string;
  commonName: string;
  organization?: string;
  ou?: string;
  country?: string;
  province?: string;
  locality?: string;
  notBefore?: string;
  notAfter?: string;
  maxPathLength?: number;
  keyAlgorithm?: string;
  requireTemplateForIssuance?: boolean;
}

export interface CreateCaResponse {
  ca: CertificateAuthority;
}

export interface UpdateCaParams {
  caId: string;
  status?: string;
  requireTemplateForIssuance?: boolean;
}

export interface UpdateCaResponse {
  ca: CertificateAuthority;
}

export interface DeleteCaParams {
  caId: string;
}

export interface DeleteCaResponse {
  ca: CertificateAuthority;
}

export interface GetCaCsrParams {
  caId: string;
}

export interface GetCaCsrResponse {
  csr: string;
}

export interface GetCaCertificateParams {
  caId: string;
}

export interface GetCaCertificateResponse {
  certificate: string;
  certificateChain: string;
  serialNumber: string;
}

export interface ListCaCertificatesParams {
  caId: string;
}

export interface CaCertificateEntry {
  certificate: string;
  certificateChain: string;
  serialNumber: string;
  version: number;
}

export type ListCaCertificatesResponse = CaCertificateEntry[];

export interface GetCaCrlsParams {
  caId: string;
}

export interface CaCrlEntry {
  id: string;
  crl: string;
}

export type GetCaCrlsResponse = CaCrlEntry[];

export interface RenewCaParams {
  caId: string;
  type: string;
  notAfter: string;
}

export interface RenewCaResponse {
  certificate: string;
  certificateChain: string;
  serialNumber: string;
}

export interface SignIntermediateCaParams {
  caId: string;
  csr: string;
  notBefore?: string;
  notAfter: string;
  maxPathLength?: number;
}

export interface SignIntermediateCaResponse {
  certificate: string;
  certificateChain: string;
  issuingCaCertificate: string;
  serialNumber: string;
}
