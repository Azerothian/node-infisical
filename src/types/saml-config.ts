import type { SamlProvider } from "./common";

export interface SamlConfig {
  id: string;
  organization: string;
  orgId: string;
  authProvider: string;
  isActive: boolean;
  entryPoint: string;
  issuer: string;
  cert: string;
  lastUsed?: string | null;
  enableGroupSync?: boolean;
}

export interface GetSamlConfigParams {
  organizationId: string;
}

export type GetSamlConfigResponse = SamlConfig;

export interface CreateSamlConfigParams {
  organizationId: string;
  authProvider: SamlProvider;
  isActive: boolean;
  entryPoint: string;
  issuer: string;
  cert: string;
  enableGroupSync?: boolean;
}

export type CreateSamlConfigResponse = SamlConfig;

export interface UpdateSamlConfigParams {
  organizationId: string;
  authProvider?: SamlProvider;
  isActive?: boolean;
  entryPoint?: string;
  issuer?: string;
  cert?: string;
  enableGroupSync?: boolean;
}

export type UpdateSamlConfigResponse = SamlConfig;
