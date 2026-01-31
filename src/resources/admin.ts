import { BaseResource } from "./base";
import type {
  BootstrapInstanceParams,
  BootstrapInstanceResponse,
  AdminSignUpParams,
  AdminSignUpResponse,
  GetAdminConfigResponse,
  UpdateAdminConfigParams,
  UpdateAdminConfigResponse,
  ListAdminUsersParams,
  ListAdminUsersResponse,
  DeleteAdminUserParams,
  DeleteAdminUserResponse,
  DeleteAdminUsersParams,
  DeleteAdminUsersResponse,
  GrantAdminAccessParams,
  GrantAdminAccessResponse,
  RevokeAdminAccessParams,
  RevokeAdminAccessResponse,
  ListAdminOrganizationsParams,
  ListAdminOrganizationsResponse,
  CreateAdminOrganizationParams,
  CreateAdminOrganizationResponse,
  DeleteAdminOrganizationParams,
  DeleteAdminOrganizationResponse,
  DeleteAdminOrgMembershipParams,
  DeleteAdminOrgMembershipResponse,
  ResendOrgInviteParams,
  ResendOrgInviteResponse,
  JoinOrganizationParams,
  JoinOrganizationResponse,
  ListAdminIdentitiesParams,
  ListAdminIdentitiesResponse,
  RevokeIdentitySuperAdminParams,
  RevokeIdentitySuperAdminResponse,
  GetAdminIntegrationsResponse,
  GetEncryptionStrategiesResponse,
  UpdateEncryptionStrategyParams,
  UpdateEncryptionStrategyResponse,
  GetEnvOverridesResponse,
  InvalidateCacheParams,
  InvalidateCacheResponse,
  GetCacheStatusResponse,
  GenerateUsageReportResponse,
} from "../types/admin";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class AdminResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "admin");
  }
  // Bootstrap & Signup

  async bootstrap(params: BootstrapInstanceParams): Promise<BootstrapInstanceResponse> {
    this.requireAuth();
    return this.http.post<BootstrapInstanceResponse>("/api/v1/admin/bootstrap", params);
  }

  async signup(params: AdminSignUpParams): Promise<AdminSignUpResponse> {
    this.requireAuth();
    return this.http.post<AdminSignUpResponse>("/api/v1/admin/signup", params);
  }

  // Config

  async getConfig(): Promise<GetAdminConfigResponse> {
    this.requireAuth();
    return this.http.get<GetAdminConfigResponse>("/api/v1/admin/config");
  }

  async updateConfig(params: UpdateAdminConfigParams): Promise<UpdateAdminConfigResponse> {
    this.requireAuth();
    return this.http.patch<UpdateAdminConfigResponse>("/api/v1/admin/config", params);
  }

  // User Management

  async listUsers(params?: ListAdminUsersParams): Promise<ListAdminUsersResponse> {
    this.requireAuth();
    return this.http.get<ListAdminUsersResponse>(
      "/api/v1/admin/user-management/users",
      { ...params } as Record<string, unknown>
    );
  }

  async deleteUser(params: DeleteAdminUserParams): Promise<DeleteAdminUserResponse> {
    this.requireAuth();
    return this.http.delete<DeleteAdminUserResponse>(
      `/api/v1/admin/user-management/users/${encodeURIComponent(params.userId)}`
    );
  }

  async deleteUsers(params: DeleteAdminUsersParams): Promise<DeleteAdminUsersResponse> {
    this.requireAuth();
    return this.http.delete<DeleteAdminUsersResponse>(
      "/api/v1/admin/user-management/users",
      params
    );
  }

  async grantAdminAccess(params: GrantAdminAccessParams): Promise<GrantAdminAccessResponse> {
    this.requireAuth();
    return this.http.patch<GrantAdminAccessResponse>(
      `/api/v1/admin/user-management/users/${encodeURIComponent(params.userId)}/admin-access`
    );
  }

  async revokeAdminAccess(params: RevokeAdminAccessParams): Promise<RevokeAdminAccessResponse> {
    this.requireAuth();
    return this.http.delete<RevokeAdminAccessResponse>(
      `/api/v1/admin/user-management/users/${encodeURIComponent(params.userId)}/admin-access`
    );
  }

  // Organization Management

  async listOrganizations(params?: ListAdminOrganizationsParams): Promise<ListAdminOrganizationsResponse> {
    this.requireAuth();
    return this.http.get<ListAdminOrganizationsResponse>(
      "/api/v1/admin/organization-management/organizations",
      { ...params } as Record<string, unknown>
    );
  }

  async createOrganization(params: CreateAdminOrganizationParams): Promise<CreateAdminOrganizationResponse> {
    this.requireAuth();
    return this.http.post<CreateAdminOrganizationResponse>(
      "/api/v1/admin/organization-management/organizations",
      params
    );
  }

  async deleteOrganization(params: DeleteAdminOrganizationParams): Promise<DeleteAdminOrganizationResponse> {
    this.requireAuth();
    return this.http.delete<DeleteAdminOrganizationResponse>(
      `/api/v1/admin/organization-management/organizations/${encodeURIComponent(params.organizationId)}`
    );
  }

  async deleteOrgMembership(params: DeleteAdminOrgMembershipParams): Promise<DeleteAdminOrgMembershipResponse> {
    this.requireAuth();
    return this.http.delete<DeleteAdminOrgMembershipResponse>(
      `/api/v1/admin/organization-management/organizations/${encodeURIComponent(params.organizationId)}/memberships/${encodeURIComponent(params.membershipId)}`
    );
  }

  async resendOrgInvite(params: ResendOrgInviteParams): Promise<ResendOrgInviteResponse> {
    this.requireAuth();
    return this.http.post<ResendOrgInviteResponse>(
      `/api/v1/admin/organization-management/organizations/${encodeURIComponent(params.organizationId)}/memberships/${encodeURIComponent(params.membershipId)}/resend-invite`
    );
  }

  async joinOrganization(params: JoinOrganizationParams): Promise<JoinOrganizationResponse> {
    this.requireAuth();
    return this.http.post<JoinOrganizationResponse>(
      `/api/v1/admin/organization-management/organizations/${encodeURIComponent(params.organizationId)}/access`
    );
  }

  // Identity Management

  async listIdentities(params?: ListAdminIdentitiesParams): Promise<ListAdminIdentitiesResponse> {
    this.requireAuth();
    return this.http.get<ListAdminIdentitiesResponse>(
      "/api/v1/admin/identity-management/identities",
      { ...params } as Record<string, unknown>
    );
  }

  async revokeIdentitySuperAdmin(params: RevokeIdentitySuperAdminParams): Promise<RevokeIdentitySuperAdminResponse> {
    this.requireAuth();
    return this.http.delete<RevokeIdentitySuperAdminResponse>(
      `/api/v1/admin/identity-management/identities/${encodeURIComponent(params.identityId)}/super-admin-access`
    );
  }

  // Integrations

  async getIntegrations(): Promise<GetAdminIntegrationsResponse> {
    this.requireAuth();
    return this.http.get<GetAdminIntegrationsResponse>("/api/v1/admin/integrations");
  }

  // Encryption

  async getEncryptionStrategies(): Promise<GetEncryptionStrategiesResponse> {
    this.requireAuth();
    return this.http.get<GetEncryptionStrategiesResponse>("/api/v1/admin/encryption-strategies");
  }

  async updateEncryptionStrategy(params: UpdateEncryptionStrategyParams): Promise<UpdateEncryptionStrategyResponse> {
    this.requireAuth();
    return this.http.patch<UpdateEncryptionStrategyResponse>(
      "/api/v1/admin/encryption-strategies",
      params
    );
  }

  // Environment Overrides

  async getEnvOverrides(): Promise<GetEnvOverridesResponse> {
    this.requireAuth();
    return this.http.get<GetEnvOverridesResponse>("/api/v1/admin/env-overrides");
  }

  // Cache

  async invalidateCache(params: InvalidateCacheParams): Promise<InvalidateCacheResponse> {
    this.requireAuth();
    return this.http.post<InvalidateCacheResponse>("/api/v1/admin/invalidate-cache", params);
  }

  async getCacheStatus(): Promise<GetCacheStatusResponse> {
    this.requireAuth();
    return this.http.get<GetCacheStatusResponse>("/api/v1/admin/invalidating-cache-status");
  }

  // Usage Report

  async generateUsageReport(): Promise<GenerateUsageReportResponse> {
    this.requireAuth();
    return this.http.post<GenerateUsageReportResponse>("/api/v1/admin/usage-report/generate");
  }
}
