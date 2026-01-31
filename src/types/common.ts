export enum AuthMethod {
  EMAIL = "email",
  GOOGLE = "google",
  GITHUB = "github",
  GITLAB = "gitlab",
  SAML = "saml",
  LDAP = "ldap",
  OIDC = "oidc",
}

export enum MfaMethod {
  EMAIL = "email",
  TOTP = "totp",
  WEBAUTHN = "webauthn",
}

export enum OrgMembershipStatus {
  Accepted = "accepted",
  Invited = "invited",
}

export enum OrgIdentityOrderBy {
  Name = "name",
}

export enum OrderByDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum MfaSessionStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  EXPIRED = "expired",
}

export enum PkiAlertEventType {
  EXPIRING = "expiring",
}

export enum PkiAlertChannelType {
  EMAIL = "email",
  WEBHOOK = "webhook",
  SLACK = "slack",
  PAGERDUTY = "pagerduty",
}

export enum CertKeyUsage {
  DIGITAL_SIGNATURE = "digitalSignature",
  KEY_ENCIPHERMENT = "keyEncipherment",
  DATA_ENCIPHERMENT = "dataEncipherment",
  KEY_AGREEMENT = "keyAgreement",
  KEY_CERT_SIGN = "keyCertSign",
  CRL_SIGN = "cRLSign",
  NON_REPUDIATION = "nonRepudiation",
  ENCIPHER_ONLY = "encipherOnly",
  DECIPHER_ONLY = "decipherOnly",
}

export enum CertExtendedKeyUsage {
  SERVER_AUTH = "serverAuth",
  CLIENT_AUTH = "clientAuth",
  CODE_SIGNING = "codeSigning",
  EMAIL_PROTECTION = "emailProtection",
  TIME_STAMPING = "timeStamping",
  OCSP_SIGNING = "ocspSigning",
}

export enum CaType {
  INTERNAL = "internal",
  ACME = "acme",
  AZURE_AD_CS = "azure-ad-cs",
}
