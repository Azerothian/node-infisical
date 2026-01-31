export type AuthConfig =
  | { mode: "jwt"; token: string }
  | { mode: "apiKey"; apiKey: string }
  | { mode: "serviceToken"; serviceToken: string }
  | { mode: "identityAccessToken"; accessToken: string };
