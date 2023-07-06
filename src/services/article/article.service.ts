import { BaseResponse } from '@/dtos/base';
import {
  Article,
  ArticleResponse,
  ArticlesResponse,
  PostArticlePayload,
  UpdateArticlePayload,
} from '@/services/article/article.dto';
import { axiosClient, axiosServer } from '@/utils/axiosClient';
import { PaginationOption } from '@/dtos/api.dto';
import { OrderEnum } from '@/constants';
import Cookies from 'js-cookie';
import { ImageUpload } from '../media/media.dto';
import { uploadImageAPI } from '../media/media.service';

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

export const getArticleByIdAPI = async (id: number) => {
  const { data } = await axiosServer.get<ArticleResponse>(`/articles/${id}`, {
    params: {
      populate: {
        thumbnail: '*',
        category: { populate: '*' },
        author: { populate: '*' },
      },
    },
  });

  return data.data;
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

  return data;
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
  const res = await uploadImageAPI(payload.data.thumbnail?.[0]);

  const { data } = await axiosClient.post<BaseResponse<Article>>('/articles', {
    data: { ...payload.data, thumbnail: res?.[0].id },
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

export const updateArticleAPI = async (payload: UpdateArticlePayload) => {
  const { articleId, data } = payload;
  const { thumbnail, ...props } = data;

  console.log(payload.data.content);

  if (payload.data.thumbnail.length > 0) {
    const res = await uploadImageAPI(payload.data.thumbnail?.[0]);
    await axiosClient.put(`/articles/${articleId}`, { data: { ...props, thumbnail: res[0].id } });
  } else {
    await axiosClient.put(`/articles/${articleId}`, { data: { ...props } });
  }
};

export const deleteArticleAPI = async (articleId: number) => {
  await axiosClient.delete(`/articles/${articleId}`);
};
