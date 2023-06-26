import { PaginationOption } from '@/dtos/api.dto';
import { Avatar, UpdateUserPayload, UserResponseData } from '@/services/user/users.dto';
import { axiosClient, axiosServer } from '@/utils/axiosClient';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse } from '../auth/auth.dto';

export const getUserDetailAPI = async (id: number) => {
  const { data } = await axiosServer.get<UserResponseData>(`/users/${id}`, {
    params: {
      populate: {
        avatar: {
          populate: '*',
        },
      },
    },
  });

  return data;
};

export const getUsersAPI = async () => {
  const { data } = await axiosServer.get<UserResponseData[]>('/users', {
    params: {
      populate: {
        avatar: {
          populate: '*',
        },
      },
    },
  });

  return data;
};

export const getLoggedInUserAPI = async () => {
  const { data } = await axiosClient.get<UserResponseData>('/users/me', {
    params: { populate: '*' },
  });

  return data;
};

export const updateUserAPI = async (user: UserResponseData, payload: UpdateUserPayload) => {
  const { name, about, major, avatar } = payload;

  let response: AxiosResponse;

  const accessToken = Cookies.get('access_token');

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + accessToken,
  };

  if (avatar && avatar.length > 0) {
    if (user.avatar) {
      await axiosClient.delete(`/upload/files/${user.avatar.id}`);
    }

    const formData = new FormData();
    formData.append('files', avatar?.[0]);

    const { data } = await axiosServer.post<Avatar[]>('/upload', formData, { headers });

    response = await axiosClient.put(`/users/${user.id}`, { ...payload, avatar: data?.[0].id });
  } else {
    response = await axiosClient.put(`/users/${user.id}`, { name, about, major });
  }

  return response.data;
};

export const searchUsersAPI = async (searchQuery: string, { page, pageSize }: PaginationOption) => {
  const { data } = await axiosServer.get<UserResponseData[]>('/users', {
    params: {
      _q: searchQuery,
      populate: {
        avatar: {
          populate: '*',
        },
        articles: {
          populate: '*',
        },
      },
      pagination: {
        page,
        pageSize,
      },
    },
  });

  return data;
};
