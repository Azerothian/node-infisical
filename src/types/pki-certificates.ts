export interface Certificate {
  id: string;
  caId?: string | null;
  status: string;
  friendlyName?: string;
  commonName?: string;
  serialNumber?: string;
  notBefore?: string;
  notAfter?: string;
  keyAlgorithm?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface CreateCertificateParams {
  profileId: string;
  csr?: string;
  attributes?: {
    commonName?: string;
    organization?: string;
    organizationalUnit?: string;
    country?: string;
    state?: string;
    locality?: string;
    keyUsages?: string[];
    extendedKeyUsages?: string[];
    altNames?: Array<{ type: string; value: string }>;
    signatureAlgorithm?: string;
    keyAlgorithm?: string;
    ttl?: string;
    notBefore?: string;
    notAfter?: string;
    basicConstraints?: { isCA: boolean; pathLength?: number };
  };
  removeRootsFromChain?: boolean;
}

export interface CreateCertificateResponse {
  certificate: {
    certificate: string;
    issuingCaCertificate: string;
    certificateChain: string;
    privateKey?: string;
    serialNumber: string;
    certificateId: string;
  } | null;
  certificateRequestId: string;
  status?: string;
  message?: string;
}

export interface GetCertificateParams {
  certificateId: string;
}

export interface GetCertificateResponse {
  certificate: Certificate & {
    subject?: {
      commonName?: string;
      organization?: string;
      organizationalUnit?: string;
      country?: string;
      state?: string;
      locality?: string;
    };
    fingerprints?: {
      sha256: string;
      sha1: string;
    };
    basicConstraints?: {
      isCA: boolean;
      pathLength?: number;
    };
    caName?: string | null;
    caType?: string | null;
    profileName?: string | null;
  };
}

export interface GetCertificateBodyParams {
  certificateId: string;
}

export interface GetCertificateBodyResponse {
  certificate: string;
  certificateChain: string | null;
  serialNumber: string;
}

export interface GetCertificateBundleParams {
  certificateId: string;
}

export interface GetCertificateBundleResponse {
  certificate: string;
  certificateChain: string | null;
  privateKey: string | null;
  serialNumber: string;
}

export interface GetCertificatePrivateKeyParams {
  certificateId: string;
}

export type GetCertificatePrivateKeyResponse = string;

export interface RenewCertificateParams {
  certificateId: string;
  removeRootsFromChain?: boolean;
}

export interface RenewCertificateResponse {
  certificate: string;
  issuingCaCertificate: string;
  certificateChain: string;
  privateKey?: string;
  serialNumber: string;
  certificateId: string;
  certificateRequestId: string;
}

export interface RevokeCertificateParams {
  certificateId: string;
  revocationReason: string;
}

export interface RevokeCertificateResponse {
  message: string;
  serialNumber: string;
  revokedAt: string;
}

export interface DeleteCertificateParams {
  certificateId: string;
}

export interface DeleteCertificateResponse {
  certificate: Certificate;
}

export interface UpdateCertificateConfigParams {
  certificateId: string;
  renewBeforeDays?: number;
  enableAutoRenewal?: boolean;
}

export interface UpdateCertificateConfigResponse {
  message: string;
  renewBeforeDays?: number;
}
