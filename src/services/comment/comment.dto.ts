import { AuthorResponse } from '@/dtos/author.dto';
import { ArticleResponse } from '../article/article.dto';
import { BasePaginationResponse, BaseResponse, BaseSingleResponse } from '@/dtos/base';

export type CommentsResponse = BasePaginationResponse<CommentAttribute>;
export type CommentResponse = BaseSingleResponse<CommentAttribute>;

export type CommentPayload = {
  data: {
    content: string;
    user: number;
    article: number;
  };
};

export type UpdateCommentPayload = {
  commentId: number;
  newContent: string;
};

export type AnswerCommentPayload = {
  article: number;
  user: number;
  commentId: number;
  reply: string;
};

export interface CommentAttribute {
  content: string;
  article: ArticleResponse;
  user: AuthorResponse;
  answers: BaseResponse<CommentAttribute>;
  comment: BaseSingleResponse<CommentAttribute>;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
