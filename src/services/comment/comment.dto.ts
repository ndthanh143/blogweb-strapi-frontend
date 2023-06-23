import { AuthorResponse } from '@/dtos/author.dto';
import { ArticleResponse } from '../article/article.dto';
import { BasePaginationResponse, BaseSingleResponse } from '@/dtos/base';

export type CommentsResponse = BasePaginationResponse<CommentAttribute>;
export type CommentResponse = BaseSingleResponse<CommentAttribute>;

export type CommentPayload = {
  data: {
    content: string;
    user: number;
    article: number;
  };
};

export interface CommentAttribute {
  content: string;
  article: ArticleResponse;
  user: AuthorResponse;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
