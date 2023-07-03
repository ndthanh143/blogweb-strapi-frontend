import { BasePaginationResponse, BaseSingleResponse } from '../../dtos/base';
import { CategoryResponse } from '../category/category.dto';
import { Media } from '../media/media.dto';
import { UserResponse } from '../user/users.dto';
import { AuthorResponse } from '@/dtos/author.dto';

export type ArticlesResponse = BasePaginationResponse<Article>;
export type ArticleResponse = BaseSingleResponse<Article>;

export interface Article {
  title: string;
  description: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  thumbnail: Media;
  category: CategoryResponse;
  author: AuthorResponse;
}

export type PostArticlePayload = {
  data: PostArticlePayloadAttributes;
};

export type PostArticlePayloadAttributes = {
  title: string;
  description: string;
  slug: string;
  category: number;
  thumbnail: FileList;
  author: number;
  content: string;
};
