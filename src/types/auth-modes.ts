export type AuthMode = "jwt" | "apiKey" | "serviceToken" | "identityAccessToken";

export type ResourceCategory =
  | "secrets"
  | "secretFolders"
  | "secretImports"
  | "projects"
  | "organizations"
  | "organizationIdentities"
  | "identities"
  | "identityAuth"
  | "identityAccessTokens"
  | "pki"
  | "kms"
  | "secretTags"
  | "appConnections"
  | "secretSyncs"
  | "integrationAuth"
  | "admin"
  | "orgAdmin"
  | "secretSharing"
  | "webhooks"
  | "users"
  | "mfa"
  | "mfaSessions"
  | "serviceTokens"
  | "password";

export const RESOURCE_AUTH_MODES: Record<ResourceCategory, readonly AuthMode[]> = {
  secrets: ["jwt", "serviceToken", "identityAccessToken"],
  secretFolders: ["jwt", "serviceToken", "identityAccessToken"],
  secretImports: ["jwt", "serviceToken", "identityAccessToken"],
  projects: ["jwt", "identityAccessToken"],
  organizations: ["jwt", "identityAccessToken"],
  organizationIdentities: ["jwt", "identityAccessToken"],
  identities: ["jwt", "identityAccessToken"],
  identityAuth: ["jwt", "identityAccessToken"],
  identityAccessTokens: ["jwt", "identityAccessToken"],
  pki: ["jwt", "identityAccessToken"],
  kms: ["jwt", "identityAccessToken"],
  secretTags: ["jwt", "identityAccessToken"],
  appConnections: ["jwt", "identityAccessToken"],
  secretSyncs: ["jwt", "identityAccessToken"],
  integrationAuth: ["jwt", "identityAccessToken"],
  admin: ["jwt"],
  orgAdmin: ["jwt"],
  secretSharing: ["jwt"],
  webhooks: ["jwt"],
  users: ["jwt"],
  mfa: ["jwt"],
  mfaSessions: ["jwt"],
  serviceTokens: ["jwt"],
  password: ["jwt"],
} as const;
