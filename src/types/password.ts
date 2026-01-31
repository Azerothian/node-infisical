export interface ResetPasswordParams {
  newPassword: string;
}

export interface ResetPasswordAuthenticatedParams {
  oldPassword: string;
  newPassword: string;
}
