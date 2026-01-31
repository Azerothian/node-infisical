export interface RenewAccessTokenParams {
  accessToken: string;
}

export interface RenewAccessTokenResponse {
  accessToken: string;
  expiresIn: number;
  accessTokenMaxTTL: number;
  tokenType: string;
}

export interface RevokeAccessTokenParams {
  accessToken: string;
}

export interface RevokeAccessTokenResponse {
  message: string;
}
