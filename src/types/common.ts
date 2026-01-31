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

export enum SamlProvider {
  OKTA_SAML = "okta-saml",
  AZURE_SAML = "azure-saml",
  JUMPCLOUD_SAML = "jumpcloud-saml",
  GOOGLE_SAML = "google-saml",
  KEYCLOAK_SAML = "keycloak-saml",
  AUTH0_SAML = "auth0-saml",
}

export enum OidcConfigurationType {
  CUSTOM = "custom",
  DISCOVERY_URL = "discovery-url",
}

export enum JwtSignatureAlgorithm {
  RS256 = "RS256",
  RS384 = "RS384",
  RS512 = "RS512",
  ES256 = "ES256",
  ES384 = "ES384",
  ES512 = "ES512",
  PS256 = "PS256",
  PS384 = "PS384",
  PS512 = "PS512",
  EdDSA = "EdDSA",
}
