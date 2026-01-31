import type { AuthMethod, MfaMethod } from "./common";

export interface User {
  id: string;
  email?: string | null;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  isEmailVerified?: boolean | null;
  authMethods?: string[] | null;
  isMfaEnabled: boolean;
  mfaMethods?: string[] | null;
  selectedMfaMethod?: string | null;
  devices?: unknown;
  createdAt: string;
  updatedAt: string;
  isGhost: boolean;
  isLocked?: boolean;
  consecutiveFailedMfaAttempts?: number;
  isAccepted?: boolean;
}

export interface UserWithEncryptionKeys extends User {
  clientPublicKey?: string | null;
  serverPrivateKey?: string | null;
  encryptionVersion?: number | null;
  protectedKey?: string | null;
  protectedKeyIV?: string | null;
  protectedKeyTag?: string | null;
  publicKey?: string | null;
  encryptedPrivateKey?: string | null;
  iv?: string | null;
  tag?: string | null;
  salt?: string | null;
  verifier?: string | null;
  userId?: string | null;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  userId: string;
  lastUsed?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenSession {
  id: string;
  userId: string;
  ip?: string | null;
  userAgent?: string | null;
  accessVersion: number;
  refreshVersion: number;
  lastUsed: string;
  createdAt: string;
  updatedAt: string;
  orgId?: string | null;
}

export interface SendEmailVerificationCodeParams {
  token: string;
}

export interface VerifyEmailVerificationCodeParams {
  username: string;
  code: string;
}

export interface UpdateMfaParams {
  isMfaEnabled?: boolean;
  selectedMfaMethod?: MfaMethod;
}

export interface UpdateMfaResponse {
  user: User;
}

export interface UpdateNameParams {
  firstName: string;
  lastName: string;
}

export interface UpdateNameResponse {
  user: User;
}

export interface UpdateAuthMethodsParams {
  authMethods: AuthMethod[];
}

export interface UpdateAuthMethodsResponse {
  user: User;
}

export interface RequestEmailChangeOtpParams {
  newEmail: string;
}

export interface RequestEmailChangeOtpResponse {
  success: boolean;
  message: string;
}

export interface UpdateEmailParams {
  newEmail: string;
  otpCode: string;
}

export interface UpdateEmailResponse {
  user: User;
}

export interface ListOrganizationsResponse {
  organizations: Organization[];
}

export interface CreateApiKeyParams {
  name: string;
  expiresIn: number;
}

export interface CreateApiKeyResponse {
  apiKey: string;
  apiKeyData: ApiKey;
}

export interface DeleteApiKeyResponse {
  apiKeyData: ApiKey;
}

export interface RevokeAllSessionsResponse {
  message: string;
}

export interface RevokeSessionResponse {
  message: string;
}

export interface GetMeResponse {
  user: UserWithEncryptionKeys;
}

export interface DeleteMeResponse {
  user: User;
}
