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
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityKubernetesAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }

  async login(params: LoginKubernetesAuthParams): Promise<LoginKubernetesAuthResponse> {
    return this.http.postNoAuth<LoginKubernetesAuthResponse>(
      "/api/v1/auth/kubernetes-auth/login",
      params
    );
  }

  async attach(params: AttachKubernetesAuthParams): Promise<AttachKubernetesAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateKubernetesAuthParams): Promise<UpdateKubernetesAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetKubernetesAuthParams): Promise<GetKubernetesAuthResponse> {
    this.requireAuth();
    return this.http.get<GetKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeKubernetesAuthParams): Promise<RevokeKubernetesAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeKubernetesAuthResponse>(
      `/api/v1/auth/kubernetes-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
