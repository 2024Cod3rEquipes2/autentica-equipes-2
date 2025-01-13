export type ChangePasswordDTO = {
  lastPassword: string;
  password: string;
  confirmPassword: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export class RegisterDTO {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  phoneNumber?: string;
}

export type ResetPasswordDTO = {
  password: string;
  confirmPassword: string;
  recoverToken: string;
};
