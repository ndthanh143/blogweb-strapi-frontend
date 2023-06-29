import { useAppDispatch } from '@/redux/store';
import { useAuth } from './useAuth';
import { answerComment, deleteComment, postComment, updateComment } from '@/redux/features/comments/commentSlice';
import { UpdateCommentPayload } from '@/services/comment/comment.dto';
import { Article } from '@/services/article/article.dto';
import { BaseResponseData } from '@/dtos/base';
import { useRouter } from 'next/router';

export const useComment = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user } = useAuth();

  const onSubmitHandler = (comment: string, data: BaseResponseData<Article>) => {
    if (user) {
      const payload = {
        data: { content: comment, user: user.id, article: data.id },
      };
      dispatch(postComment(payload));
    } else {
      router.push('/login');
    }
  };

  const onDeleteHandler = (commentId: number) => {
    if (user) {
      dispatch(deleteComment(commentId));
    }
  };

  const onUpdateCommentHandler = (payload: UpdateCommentPayload) => {
    dispatch(updateComment(payload));
  };

  const onAnswerCommentHandler = (commentId: number, reply: string, data: BaseResponseData<Article>) => {
    if (user && data) {
      const payload = {
        article: data.id,
        user: user.id,
        commentId,
        reply,
      };
      dispatch(answerComment(payload));
    }
  };

  return { onSubmitHandler, onDeleteHandler, onUpdateCommentHandler, onAnswerCommentHandler };
};
