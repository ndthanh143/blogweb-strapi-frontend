import { axiosClient, axiosServer } from '@/utils/axiosClient';
import { CommentPayload, CommentResponse, CommentsResponse } from './comment.dto';

export const createCommentAPI = async (commentPayload: CommentPayload) => {
  commentPayload.data.content.replaceAll(`${process.env.NEXT_PUBLIC_API_URL}`, '/uploads');
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
      },
      sort: {
        publishedAt: 'desc',
      },
    },
  });

  return data.data;
};

export const deleteCommentAPI = async (commentId: number) => {
  try {
    await axiosClient.delete(`/comments/${commentId}`);
    return true;
  } catch (error) {}
  return false;
};

export const updateCommentAPI = async (commentId: number, newContent: string) => {
  const { data } = await axiosClient.put<CommentsResponse>(`/comments/${commentId}`, { data: { content: newContent } });

  return data;
};
