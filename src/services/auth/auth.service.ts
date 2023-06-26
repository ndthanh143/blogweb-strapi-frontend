import { axiosClient, axiosServer } from '@/utils/axiosClient';
import { AuthResponse, ChangePasswordPayload, LoginPayload, RegisterPayload } from './auth.dto';
import { updateUserAPI } from '../user/user.service';
import Cookies from 'js-cookie';

export const loginAPI = async (loginPayload: LoginPayload) => {
  const { data } = await axiosServer.post<AuthResponse>('/auth/local', loginPayload);

  Cookies.set('access_token', data.jwt);
};

export const logoutAPI = async () => {
  Cookies.remove('access_token');
};

export const registerAPI = async (registerPayload: RegisterPayload) => {
  const { data } = await axiosServer.post<AuthResponse>('/auth/local/register', registerPayload);

  Cookies.set('access_token', data.jwt);

  updateUserAPI(data.user, { name: data.user.username });
};

export const changePasswordAPI = async (changePasswordPayload: ChangePasswordPayload) =>
  await axiosClient.post('/auth/change-password', changePasswordPayload);
