import { Avatar, Label, Seo, Comment, Button, Popper } from '@/components';
import { getStrapiMedia } from '@/utils/media';
import moment from 'moment';
import { storeWrapper, useAppDispatch, useAppSelector } from '@/redux/store';
import { getArticleDetail } from '@/redux/features/articles/articleSlice';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getArticlesAPI } from '@/services/article/article.service';
import { SEO } from '@/services/homepage/homepage.dto';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useArticle } from '@/hooks/useArticle';
import { useEffect, useState } from 'react';
import { getCommentsArticle } from '@/redux/features/comments/commentsSlice';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { UpdateCommentPayload } from '@/services/comment/comment.dto';
import {
  answerComment,
  deleteComment,
  postComment,
  resetState,
  updateComment,
} from '@/redux/features/comments/commentSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { useTranslation } from 'next-i18next';

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false });
export default function Post() {
  const { t } = useTranslation('blog');
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { data } = useArticle();

  const { user } = useAuth();

  const [comment, setComment] = useState('');

  const { data: comments, loading: commentsLoading } = useAppSelector((state) => state.comments);

  const {
    isPostSuccess,
    isDeleteSuccess,
    isUpdateSuccess,
    isAnswerSuccess,
    loading: commentResLoading,
  } = useAppSelector((state) => state.handleComment);

  const onSubmitHandler = () => {
    if (user && data) {
      const payload = {
        data: { content: comment, user: user.id, article: data.id },
      };
      dispatch(postComment(payload));
    } else {
      router.push('/login');
    }
  };

  const onDeleteHandler = (commentId: number) => {
    if (user && data) {
      dispatch(deleteComment(commentId));
    }
  };

  const onUpdateCommentHandler = (payload: UpdateCommentPayload) => {
    dispatch(updateComment(payload));
  };

  const onAnswerCommentHandler = (commentId: number, reply: string) => {
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

  useEffect(() => {
    if (isPostSuccess) {
      toast.success('Comment successfully!');
      setComment('');
    }
    if (isDeleteSuccess) {
      toast.success('Comment deleted!');
    }
    if (isUpdateSuccess) {
      toast.success('Comment updated!');
    }

    if (isAnswerSuccess) {
      toast.success('Answer successfully!');
    }

    dispatch(resetState());

    if (data) {
      dispatch(getCommentsArticle(data.id));
    }
  }, [dispatch, isPostSuccess, isDeleteSuccess, isUpdateSuccess, isAnswerSuccess, data]);

  const seo: SEO = {
    metaTitle: data?.attributes.title,
    metaDescription: data?.attributes.description,
    shareImage: data?.attributes.thumbnail,
    article: true,
  };

  const shareUrl = process.env.NEXT_PUBLIC_SITE_URL + router.asPath;

  let content = data?.attributes.content.replaceAll(/\/uploads/g, `${process.env.API_NEXT_PUBLIC_IMAGE_URL}/uploads`);
  content = content?.replaceAll(/\/v\d+\//g, '/q_60/');

  return (
    data && (
      <div className="mb-8">
        <ToastContainer />
        <Seo seo={seo} />
        <div>
          <div className="my-4">
            <Label color="primary">{data.attributes.category.data.attributes.name}</Label>
          </div>
          <p className="flex text-xl lg:text-3xl font-bold mb-4 dark:text-color-bold-dark">{data.attributes.title}</p>
          <div className="flex items-center font-sm drop-shadow-xl lg:text-color-blur">
            <Link href={`/writer/${data.attributes.author.data.id}`}>
              <Avatar
                src={
                  data.attributes.author.data.attributes.avatar?.data &&
                  getStrapiMedia(data.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail)
                }
                width={40}
                height={40}
                alt={data.attributes.author.data.attributes.avatar?.data?.attributes.alternativeText || ''}
                size={data.attributes.author.data.attributes.avatar?.data?.attributes.formats.thumbnail + '' || ''}
              />
            </Link>
            <Link href={`/writer/${data.attributes.author.data.id}`} className="mx-4 font-medium hover:text-blue-500">
              {data.attributes.author.data.attributes.name}
            </Link>
            <p>{moment(data.attributes.publishedAt).format('MMMM DD, YYYY')}</p>
          </div>
          {content && (
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              className="my-4"
            />
          )}
        </div>
        <div className="my-2">
          <FacebookShareButton url={shareUrl} className="rounded-full overflow-hidden">
            <FacebookIcon size={30} />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} className="rounded-full overflow-hidden ml-2">
            <TwitterIcon size={30} />
          </TwitterShareButton>
          <TelegramShareButton url={shareUrl} className="rounded-full overflow-hidden ml-2">
            <TelegramIcon size={30} />
          </TelegramShareButton>
        </div>
        <div>
          <h2 className="font-medium text-2xl mb-4">{t('titleComment')}</h2>
          <div className="border dark:border-dark-mode p-4 mb-8 rounded-lg">
            <div className="flex-1">
              <Editor onChange={(e) => setComment(e.target.value)} value={comment} />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="solid"
                disabled={comment === ''}
                loading={commentResLoading}
                onClick={onSubmitHandler}
                aria-label="Comment - CLick to submit your comment"
              >
                {t('comment')}
              </Button>
            </div>
          </div>
        </div>
        {commentsLoading ? (
          <div className="text-2xl my-4 flex justify-center animate-spin duration-200">
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          comments &&
          comments.length > 0 && (
            <div>
              {comments.map(
                (comment) =>
                  !comment.attributes.comment.data && (
                    <div className="border dark:border-dark-mode rounded-lg px-6 my-4" key={comment.id}>
                      <Comment
                        data={comment.attributes}
                        key={comment.id}
                        onDelete={() => onDeleteHandler(comment.id)}
                        onUpdate={(newContent) => onUpdateCommentHandler({ commentId: comment.id, newContent })}
                        onAnswer={(reply) => onAnswerCommentHandler(comment.id, reply)}
                        className="py-4"
                      />

                      {comment.attributes.answers.data.map((answer) => (
                        <Comment
                          data={answer.attributes}
                          key={answer.id}
                          onDelete={() => onDeleteHandler(comment.id)}
                          onUpdate={(newContent) => onUpdateCommentHandler({ commentId: answer.id, newContent })}
                          className="mx-6 pb-2"
                        />
                      ))}
                    </div>
                  ),
              )}
            </div>
          )
        )}
      </div>
    )
  );
}

Post.Layout = 'Main';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getArticlesAPI({ page: 1, pageSize: 5 });

  const paths = data.map((item) => ({
    params: {
      slug: item.attributes.slug,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = storeWrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params, locale }) => {
      if (params) {
        await dispatch(getArticleDetail(params.slug as string));
      }

      return {
        props: { ...(await serverSideTranslations(locale || 'en', ['common', 'blog', 'header', 'footer'])) },
        revalidate: 5,
      };
    },
);
