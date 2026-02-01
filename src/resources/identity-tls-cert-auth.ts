import { BaseResource } from "./base";
import type {
  LoginTlsCertAuthParams,
  LoginTlsCertAuthResponse,
  AttachTlsCertAuthParams,
  AttachTlsCertAuthResponse,
  UpdateTlsCertAuthParams,
  UpdateTlsCertAuthResponse,
  GetTlsCertAuthParams,
  GetTlsCertAuthResponse,
  RevokeTlsCertAuthParams,
  RevokeTlsCertAuthResponse,
} from "../types/identity-tls-cert-auth";
import type { HttpClient } from "../http";
import type { AuthState } from "../auth-state";

export class IdentityTlsCertAuthResource extends BaseResource {
  constructor(http: HttpClient, authState: AuthState) {
    super(http, authState, "identityAuth");
  }
  async login(params: LoginTlsCertAuthParams): Promise<LoginTlsCertAuthResponse> {
    return this.http.postNoAuth<LoginTlsCertAuthResponse>(
      "/api/v1/auth/tls-cert-auth/login",
      params
    );
  }

  async attach(params: AttachTlsCertAuthParams): Promise<AttachTlsCertAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.post<AttachTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateTlsCertAuthParams): Promise<UpdateTlsCertAuthResponse> {
    this.requireAuth();
    const { identityId, ...body } = params;
    return this.http.patch<UpdateTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetTlsCertAuthParams): Promise<GetTlsCertAuthResponse> {
    this.requireAuth();
    return this.http.get<GetTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeTlsCertAuthParams): Promise<RevokeTlsCertAuthResponse> {
    this.requireAuth();
    return this.http.delete<RevokeTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
