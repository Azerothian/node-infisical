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

export class IdentityTlsCertAuthResource extends BaseResource {
  async login(params: LoginTlsCertAuthParams): Promise<LoginTlsCertAuthResponse> {
    return this.http.post<LoginTlsCertAuthResponse>(
      "/api/v1/auth/tls-cert-auth/login",
      params
    );
  }

  async attach(params: AttachTlsCertAuthParams): Promise<AttachTlsCertAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateTlsCertAuthParams): Promise<UpdateTlsCertAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetTlsCertAuthParams): Promise<GetTlsCertAuthResponse> {
    return this.http.get<GetTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeTlsCertAuthParams): Promise<RevokeTlsCertAuthResponse> {
    return this.http.delete<RevokeTlsCertAuthResponse>(
      `/api/v1/auth/tls-cert-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }
}
