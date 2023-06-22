import { AuthorResponse } from '@/dtos/author.dto';
import { ArticleResponse } from '../article/article.dto';
import { BasePaginationResponse, BaseSingleResponse } from '@/dtos/base';

export type CommentsResponse = BasePaginationResponse<Comment>;
export type CommentResponse = BaseSingleResponse<Comment>;

export type CommentPayload = {
  data: {
    content: string;
    user: number;
    article: number;
  };
};

export interface Comment {
  content: string;
  article: ArticleResponse;
  user: AuthorResponse;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
