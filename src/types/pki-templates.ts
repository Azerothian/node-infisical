import type { CertKeyUsage, CertExtendedKeyUsage } from "./common";

export interface CertificateTemplate {
  id: string;
  caId: string;
  name: string;
  commonName: string;
  subjectAlternativeName: string;
  ttl: string;
  projectId: string;
  keyUsages?: CertKeyUsage[];
  extendedKeyUsages?: CertExtendedKeyUsage[];
  createdAt: string;
  updatedAt: string;
}

export interface CertificateTemplateWithCa extends CertificateTemplate {
  ca: { id: string; name: string };
}

export interface CreatePkiTemplateParams {
  name: string;
  caName: string;
  projectId: string;
  commonName: string;
  subjectAlternativeName: string;
  ttl: string;
  keyUsages?: CertKeyUsage[];
  extendedKeyUsages?: CertExtendedKeyUsage[];
}

export interface CreatePkiTemplateResponse {
  certificateTemplate: CertificateTemplate;
}

export interface UpdatePkiTemplateParams {
  templateName: string;
  name?: string;
  caName: string;
  projectId: string;
  commonName?: string;
  subjectAlternativeName?: string;
  ttl?: string;
  keyUsages?: CertKeyUsage[];
  extendedKeyUsages?: CertExtendedKeyUsage[];
}

export interface UpdatePkiTemplateResponse {
  certificateTemplate: CertificateTemplate;
}

export interface DeletePkiTemplateParams {
  templateName: string;
  projectId: string;
}

export interface DeletePkiTemplateResponse {
  certificateTemplate: CertificateTemplate;
}

export interface GetPkiTemplateParams {
  templateName: string;
  projectId: string;
}

export interface GetPkiTemplateResponse {
  certificateTemplate: CertificateTemplateWithCa;
}

export interface ListPkiTemplatesParams {
  projectId: string;
  limit?: number;
  offset?: number;
}

export interface ListPkiTemplatesResponse {
  certificateTemplates: CertificateTemplateWithCa[];
  totalCount: number;
}

export interface IssueCertificateParams {
  templateName: string;
  projectId: string;
  commonName: string;
  ttl: string;
  keyUsages?: CertKeyUsage[];
  extendedKeyUsages?: CertExtendedKeyUsage[];
  notBefore?: string;
  notAfter?: string;
  altNames?: string;
}

export interface IssueCertificateResponse {
  certificate: string;
  issuingCaCertificate: string;
  certificateChain: string;
  privateKey: string;
  serialNumber: string;
}

export interface SignCertificateParams {
  templateName: string;
  projectId: string;
  ttl: string;
  csr: string;
}

export interface SignCertificateResponse {
  certificate: string;
  issuingCaCertificate: string;
  certificateChain: string;
  serialNumber: string;
}
