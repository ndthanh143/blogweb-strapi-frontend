import { Avatar, Label, Seo, Comment, Button } from '@/components';
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
import { useForm } from 'react-hook-form';
import { CommentPayload } from '@/services/comment/comment.dto';
import { deleteComment, postComment, resetState } from '@/redux/features/comments/commentSlice';
import { ToastContainer, toast } from 'react-toastify';

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false });
export default function Post() {
  const dispatch = useAppDispatch();
  const { data } = useArticle();

  const { user } = useAuth();

  const [comment, setComment] = useState('');

  const { data: comments } = useAppSelector((state) => state.comments);
  const { isPostSuccess, isDeleteSuccess, loading: commentResLoading } = useAppSelector((state) => state.handleComment);

  const onSubmitHandler = () => {
    if (user && data) {
      const payload = {
        data: { content: comment, user: user.id, article: data.id },
      };

      dispatch(postComment(payload));
    }
  };

  const onDeleteHandler = (commentId: number) => {
    if (user && data) {
      dispatch(deleteComment(commentId));
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
    dispatch(resetState());

    if (data) {
      dispatch(getCommentsArticle(data.id));
    }
  }, [dispatch, isPostSuccess, isDeleteSuccess, data]);

  const seo: SEO = {
    metaTitle: data?.attributes.title,
    metaDescription: data?.attributes.description,
    shareImage: data?.attributes.thumbnail,
    article: true,
  };

  let content = data?.attributes.content.replaceAll(/\/uploads/g, `${process.env.API_NEXT_PUBLIC_IMAGE_URL}/uploads`);
  content = content?.replaceAll(/\/v\d+\//, '/q_60/');

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
        <div className="">
          <h2 className="font-medium text-2xl mb-4">Answers</h2>

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
                Comment
              </Button>
            </div>
          </div>
        </div>
        {comments.length > 0 && (
          <div className="border dark:border-dark-mode rounded-lg px-6">
            {comments.map((item) => (
              <Comment data={item.attributes} key={item.id} onDelete={() => onDeleteHandler(item.id)} />
            ))}
          </div>
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
        props: { ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])) },
        revalidate: 10,
      };
    },
);
