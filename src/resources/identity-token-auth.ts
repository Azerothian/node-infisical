import { BaseResource } from "./base";
import type {
  LoginTokenAuthParams,
  LoginTokenAuthResponse,
  AttachTokenAuthParams,
  AttachTokenAuthResponse,
  UpdateTokenAuthParams,
  UpdateTokenAuthResponse,
  GetTokenAuthParams,
  GetTokenAuthResponse,
  RevokeTokenAuthParams,
  RevokeTokenAuthResponse,
  CreateTokenAuthTokenParams,
  CreateTokenAuthTokenResponse,
  ListTokenAuthTokensParams,
  ListTokenAuthTokensResponse,
  GetTokenAuthTokenParams,
  GetTokenAuthTokenResponse,
  UpdateTokenAuthTokenParams,
  UpdateTokenAuthTokenResponse,
  RevokeTokenAuthTokenParams,
  RevokeTokenAuthTokenResponse,
} from "../types/identity-token-auth";

export class IdentityTokenAuthResource extends BaseResource {
  async login(params: LoginTokenAuthParams): Promise<LoginTokenAuthResponse> {
    return this.http.post<LoginTokenAuthResponse>(
      "/api/v1/auth/token/login",
      params
    );
  }

  async attach(params: AttachTokenAuthParams): Promise<AttachTokenAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.post<AttachTokenAuthResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async update(params: UpdateTokenAuthParams): Promise<UpdateTokenAuthResponse> {
    const { identityId, ...body } = params;
    return this.http.patch<UpdateTokenAuthResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(identityId)}`,
      body
    );
  }

  async get(params: GetTokenAuthParams): Promise<GetTokenAuthResponse> {
    return this.http.get<GetTokenAuthResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async revoke(params: RevokeTokenAuthParams): Promise<RevokeTokenAuthResponse> {
    return this.http.delete<RevokeTokenAuthResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(params.identityId)}`
    );
  }

  async createToken(params: CreateTokenAuthTokenParams): Promise<CreateTokenAuthTokenResponse> {
    const { identityId, ...body } = params;
    return this.http.post<CreateTokenAuthTokenResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(identityId)}/tokens`,
      body
    );
  }

  async listTokens(params: ListTokenAuthTokensParams): Promise<ListTokenAuthTokensResponse> {
    const { identityId, ...query } = params;
    return this.http.get<ListTokenAuthTokensResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(identityId)}/tokens`,
      { ...query } as Record<string, unknown>
    );
  }

  async getToken(params: GetTokenAuthTokenParams): Promise<GetTokenAuthTokenResponse> {
    return this.http.get<GetTokenAuthTokenResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(params.identityId)}/tokens/${encodeURIComponent(params.tokenId)}`
    );
  }

  async updateToken(params: UpdateTokenAuthTokenParams): Promise<UpdateTokenAuthTokenResponse> {
    const { identityId, tokenId, ...body } = params;
    return this.http.patch<UpdateTokenAuthTokenResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(identityId)}/tokens/${encodeURIComponent(tokenId)}`,
      body
    );
  }

  async revokeToken(params: RevokeTokenAuthTokenParams): Promise<RevokeTokenAuthTokenResponse> {
    return this.http.delete<RevokeTokenAuthTokenResponse>(
      `/api/v1/auth/token-auth/identities/${encodeURIComponent(params.identityId)}/tokens/${encodeURIComponent(params.tokenId)}`
    );
  }
}
