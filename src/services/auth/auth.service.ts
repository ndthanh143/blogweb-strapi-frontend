import { axiosClient } from '@/utils/axiosClient';
import { ChangePasswordPayload, LoginPayload, RegisterPayload } from './auth.dto';
import { updateUserAPI } from '../user/user.service';
import { UserResponseData } from '../user/users.dto';

export const loginAPI = async (loginPayload: LoginPayload) => await axiosClient.post('/auth/local', loginPayload);

export const logoutAPI = async () => await axiosClient.post('/logout');

export const registerAPI = async (registerPayload: RegisterPayload) => {
  const { data } = await axiosClient.post<UserResponseData>('/register', registerPayload);

  updateUserAPI(data, { name: data.username });
};

export const changePasswordAPI = async (changePasswordPayload: ChangePasswordPayload) =>
  await axiosClient.post('/change-password', changePasswordPayload);
