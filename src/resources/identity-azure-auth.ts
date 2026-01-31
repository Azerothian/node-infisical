import { BaseResource } from "./base";
import type {
  LoginAzureAuthParams,
  LoginAzureAuthResponse,
  AttachAzureAuthParams,
  AttachAzureAuthResponse,
  UpdateAzureAuthParams,
  UpdateAzureAuthResponse,
  GetAzureAuthParams,
  GetAzureAuthResponse,
  RevokeAzureAuthParams,
  RevokeAzureAuthResponse,
} from "../types/identity-azure-auth";

export class IdentityAzureAuthResource extends BaseResource {
  async login(params: LoginAzureAuthParams): Promise<LoginAzureAuthResponse> {
    return this.http.post<LoginAzureAuthResponse>(
      "/api/v1/auth/azure-auth/login",
      params
    );
  }

  async attach(params: AttachAzureAuthParams): Promise<AttachAzureAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateAzureAuthParams): Promise<UpdateAzureAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetAzureAuthParams): Promise<GetAzureAuthResponse> {
    return this.http.get<GetAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeAzureAuthParams): Promise<RevokeAzureAuthResponse> {
    return this.http.delete<RevokeAzureAuthResponse>(
      `/api/v1/auth/azure-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
