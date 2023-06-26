import { axiosClient, axiosServer } from '@/utils/axiosClient';
import {
  AnswerCommentPayload,
  CommentPayload,
  CommentResponse,
  CommentsResponse,
  UpdateCommentPayload,
} from './comment.dto';
import Cookies from 'js-cookie';

export const getCommentAPI = async (commentId: number) => {
  const { data } = await axiosClient.get<CommentResponse>(`/comments/${commentId}`);

  return data;
};

export const createCommentAPI = async (commentPayload: CommentPayload) => {
  const { data } = await axiosClient.post<CommentResponse>('/comments', commentPayload);

  if (data.data) {
    return true;
  }
  return false;
};

export const getCommentsArticleAPI = async (articleId: number) => {
  const { data } = await axiosServer.get<CommentsResponse>('/comments', {
    params: {
      filters: {
        article: {
          id: articleId,
        },
      },
      populate: {
        user: {
          populate: '*',
        },
        answers: {
          populate: '*',
        },
        comment: {
          populate: '*',
        },
      },
      sort: {
        publishedAt: 'desc',
      },
    },
  });

  return data.data;
};

export const deleteCommentAPI = async (commentId: number) => {
  await axiosClient.delete(`/comments/${commentId}`);

  return true;
};

export const updateCommentAPI = async (payload: UpdateCommentPayload) => {
  const { commentId, newContent } = payload;

  await axiosClient.put<CommentsResponse>(`/comments/${commentId}`, { data: { content: newContent } });

  return true;
};

export const answerCommentAPI = async (commentPayload: AnswerCommentPayload) => {
  const { commentId, reply, user, article } = commentPayload;

  const payload = {
    data: {
      article,
      user,
      content: reply,
      comment: commentId,
    },
  };

  await axiosClient.post<CommentResponse>('/comments', payload);

  return true;
};
