import { UserResponseData } from '../user/users.dto';

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type ChangePasswordPayload = {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
};

export type AuthResponse = {
  jwt: string;
  user: UserResponseData;
};
