import { BaseResponse } from '@/dtos/base';
import { Article, ArticlesResponse, PostArticlePayload } from '@/services/article/article.dto';
import { axiosClient, axiosServer } from '@/utils/axiosClient';
import { Avatar } from '../user/users.dto';
import { PaginationOption } from '@/dtos/api.dto';
import { OrderEnum } from '@/constants';
import Cookies from 'js-cookie';

export const getArticlesAPI = async ({ page, pageSize }: PaginationOption = {}) => {
  const { data } = await axiosServer.get<ArticlesResponse>('/articles', {
    params: {
      populate: {
        thumbnail: '*',
        category: {
          populate: '*',
        },
        author: {
          populate: {
            avatar: '*',
          },
        },
      },
      sort: {
        publishedAt: OrderEnum.DESC,
      },
      pagination: {
        page,
        pageSize,
      },
    },
  });

  console.log('haha', data);

  return data;
};

export const getArticleDetailAPI = async (slug: string) => {
  const { data } = await axiosServer.get<ArticlesResponse>('/articles', {
    params: {
      filters: {
        slug,
      },
      populate: {
        thumbnail: '*',
        category: { populate: '*' },
        author: { populate: '*' },
      },
    },
  });

  return data.data?.[0];
};

export const getArticlesByWriterAPI = async (writerId: number, { page, pageSize }: PaginationOption) => {
  const { data } = await axiosServer.get<ArticlesResponse>('/articles', {
    params: {
      filters: {
        author: writerId,
      },
      populate: {
        thumbnail: '*',
        category: {
          populate: '*',
        },
        author: {
          populate: '*',
        },
        pagination: {
          page,
          pageSize,
        },
      },
      sort: {
        publishedAt: OrderEnum.DESC,
      },
    },
  });

  return data.data;
};

export const getArticlesByCategoryAPI = async (
  categoryId: number,
  { page, pageSize }: PaginationOption,
  sort?: string,
) => {
  const { data } = await axiosServer.get<ArticlesResponse>('/articles', {
    params: {
      filters: {
        category: categoryId,
      },
      populate: {
        thumbnail: '*',
        category: {
          populate: '*',
        },
        author: {
          populate: '*',
        },
        pagination: {
          page,
          pageSize,
        },
      },
      sort: {
        publishedAt: sort || OrderEnum.DESC,
      },
    },
  });

  return data;
};

export const postArticleAPI = async (payload: PostArticlePayload) => {
  const formData = new FormData();
  formData.append('files', payload.data.thumbnail?.[0]);

  const accessToken = Cookies.get('access_token');

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + accessToken,
  };

  const res = await axiosServer.post<Avatar[]>('/upload', formData, { headers });

  const { data } = await axiosClient.post<BaseResponse<Article>>('/articles', {
    data: { ...payload.data, thumbnail: res.data?.[0].id },
  });

  return data;
};

export const searchArticlesAPI = async (searchQuery: string, { page, pageSize }: PaginationOption, sort?: string) => {
  const { data } = await axiosServer.get<ArticlesResponse>('/articles', {
    params: {
      _q: searchQuery,
      category: {
        data: {
          attributes: {
            name: 'technology',
          },
        },
      },
      populate: {
        thumbnail: '*',
        category: {
          populate: '*',
        },
        author: {
          populate: {
            avatar: '*',
          },
        },
      },
      sort: {
        publishedAt: sort || OrderEnum.DESC,
      },
      pagination: {
        page,
        pageSize,
      },
    },
  });

  return data;
};
