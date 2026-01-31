import { BaseResource } from "./base";
import type {
  LoginKubernetesAuthParams,
  LoginKubernetesAuthResponse,
  AttachKubernetesAuthParams,
  AttachKubernetesAuthResponse,
  UpdateKubernetesAuthParams,
  UpdateKubernetesAuthResponse,
  GetKubernetesAuthParams,
  GetKubernetesAuthResponse,
  RevokeKubernetesAuthParams,
  RevokeKubernetesAuthResponse,
} from "../types/identity-kubernetes-auth";

export class IdentityKubernetesAuthResource extends BaseResource {
  async login(params: LoginKubernetesAuthParams): Promise<LoginKubernetesAuthResponse> {
    return this.http.post<LoginKubernetesAuthResponse>(
      "/api/v1/auth/kubernetes-auth/login",
      params
    );
  }

  async attach(params: AttachKubernetesAuthParams): Promise<AttachKubernetesAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateKubernetesAuthParams): Promise<UpdateKubernetesAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetKubernetesAuthParams): Promise<GetKubernetesAuthResponse> {
    return this.http.get<GetKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeKubernetesAuthParams): Promise<RevokeKubernetesAuthResponse> {
    return this.http.delete<RevokeKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
