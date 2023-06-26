import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, number, object, string } from 'yup';
import { PostArticlePayloadAttributes } from '@/services/article/article.dto';
import { storeWrapper, useAppDispatch, useAppSelector } from '@/redux/store';
import { useAuth } from '@/hooks/useAuth';
import { convertToSlug } from '@/utils/slugConvert';
import { postArticle, resetState } from '@/redux/features/articles/postArticleSlice';
import { ToastContainer, toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Button, Input, Select } from '@/components';
import { getCategories } from '@/redux/features/categories/categoriesSlice';

const schema = object({
  title: string().required('This field is required'),
  description: string().required('This field is required'),
  thumbnail: mixed().required('This field is required'),
  content: string().required('This field is required'),
  category: number().required('This field is required'),
});

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false });
export default function PostBlog() {
  const { t } = useTranslation('publish.post');

  const { user } = useAuth({ redirectTo: '/login' });

  const dispatch = useAppDispatch();

  const { data: categories } = useAppSelector((state) => state.categories);

  const { data: articleResponse, loading: postLoading } = useAppSelector((state) => state.postArticle);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<PostArticlePayloadAttributes>({
    resolver: yupResolver(schema),
  });

  const {
    field: { onChange, onBlur, ref, value },
  } = useController({ control, name: 'content' });

  const onSubmitHandler = (payload: PostArticlePayloadAttributes) => {
    if (user) {
      payload.author = user.id;
      payload.slug = convertToSlug(payload.title);
      payload.content = payload.content.replaceAll(`${process.env.NEXT_PUBLIC_API_URL}`, '');
      dispatch(postArticle({ data: payload }));
    }
  };

  const translate = {
    title: t('title'),
    thumbnail: t('thumbnail'),
    category: t('category'),
    description: t('description'),
    content: t('content'),
    cancel: t('cancel'),
    confirm: t('confirm'),
  };

  useEffect(() => {
    if (articleResponse) {
      toast.success('Post article successfully!');
      reset();
      dispatch(resetState());
    }
  }, [dispatch, articleResponse, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-4">
      <ToastContainer />
      <div className="mb-4">
        <span className="text-sm font-thin">
          <span className="text-red-500">*</span> {translate.title}
        </span>
        <Input {...register('title')} placeholder="Title" />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> {translate.thumbnail}
          </span>
          <Input {...register('thumbnail')} type="file" />
          {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
        </div>
        <div>
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> {translate.category}
          </span>
          <Select {...register('category')}>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.attributes.name}
              </option>
            ))}
          </Select>
          {errors.category && <span className="text-red-500">{errors.category.message}</span>}
        </div>
      </div>
      <div className="mb-4">
        <span className="text-sm font-thin">
          <span className="text-red-500">*</span> {translate.description}
        </span>
        <Input {...register('description')} placeholder="Description" />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>
      <div className="mb-4 ">
        <span className="text-sm font-thin">
          <span className="text-red-500">*</span> {translate.content}
        </span>
        <Editor onChange={onChange} onBlur={onBlur} value={value || ''} ref={ref} />
        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="outlined" className="mx-4" aria-label={translate.cancel}>
          {translate.cancel}
        </Button>
        <Button
          loading={postLoading}
          disabled={postLoading}
          type="submit"
          variant="solid"
          className=""
          aria-label={translate.confirm}
        >
          {translate.confirm}
        </Button>
      </div>
    </form>
  );
}

PostBlog.Layout = 'Main';

export const getStaticProps = storeWrapper.getStaticProps(({ dispatch }) => async ({ params, locale }) => {
  await dispatch(getCategories());

  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', 'publish.post', 'header', 'footer'])) },
    revalidate: 5,
  };
});
