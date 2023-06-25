import { axiosServer } from '@/utils/axiosClient';
import { GlobalResponse } from './global.dto';

export const getGlobalAPI = async () => {
  const { data } = await axiosServer.get<GlobalResponse>('/global', {
    params: {
      populate: {
        favicon: '*',
        defaultSeo: {
          populate: '*',
        },
      },
    },
  });

  return data;
};
