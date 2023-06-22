import { Article } from '../article/article.dto';
import { BasePaginationResponse, BaseResponse, BaseSingleResponse } from '../../dtos/base';

export type CategoriesResponse = BasePaginationResponse<Category>;

export type CategoryResponse = BaseSingleResponse<Category>;

export interface Category {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  articles: BaseResponse<Article>;
}
