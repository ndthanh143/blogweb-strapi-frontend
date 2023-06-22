import { HomepageResponse } from '@/services/homepage/homepage.dto';
import { axiosServer } from '@/utils/axiosClient';

export const getHomepageAPI = async () => {
  const { data } = await axiosServer.get<HomepageResponse>('/homepage', {
    params: {
      populate: {
        favicon: '*',
        seo: {
          populate: '*',
        },
      },
    },
  });
  return data;
};
