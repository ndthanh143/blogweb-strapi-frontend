import { axiosServer } from '@/utils/axiosClient';
import Cookies from 'js-cookie';
import { ImageUpload } from '@/services/media/media.dto';

export const uploadImageAPI = async (file: File) => {
  const body = new FormData();

  body.append('files', file);

  const accessToken = Cookies.get('access_token');

  const { data } = await axiosServer.post<ImageUpload[]>('/upload', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return data;
};
