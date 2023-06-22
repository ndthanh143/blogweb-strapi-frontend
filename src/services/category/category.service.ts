import { CategoriesResponse } from '@/services/category/category.dto';
import { axiosServer } from '@/utils/axiosClient';

export const getCategoriesAPI = async () => {
  const { data } = await axiosServer.get<CategoriesResponse>('/categories', { params: { populate: '*' } });

  return data;
};

export const getCategoryDetailAPI = async (slug: string) => {
  const { data } = await axiosServer.get<CategoriesResponse>('/categories', {
    params: {
      filters: {
        slug,
      },
      populate: {
        articles: {
          populate: {
            thumbnail: '*',
            category: {
              populate: '*',
            },
            author: {
              populate: '*',
            },
          },
        },
      },
    },
  });

  return data.data?.[0].attributes;
};
