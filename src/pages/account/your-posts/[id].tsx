import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, number, object, string } from 'yup';
import { PostArticlePayloadAttributes, UpdateArticlePayload } from '@/services/article/article.dto';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { convertToSlug } from '@/utils/slugConvert';
import { ToastContainer, toast } from 'react-toastify';
import { Button, DropZone, Input, Select } from '@/components';
import { getCategories } from '@/redux/features/categories/categoriesSlice';
import { useRouter } from 'next/router';
import { getArticleById, resetState, updateArticle } from '@/redux/features/articles/articleSlice';
import { getStrapiMedia } from '@/utils/media';

const schema = object({
  title: string().required('This field is required'),
  description: string().required('This field is required'),
  thumbnail: mixed().required('This field is required'),
  content: string().required('This field is required'),
  category: number().required('This field is required'),
});

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false });
export default function UpdatePost() {
  const { query } = useRouter();

  const dispatch = useAppDispatch();

  const { data: article, loading, isUpdateSuccess } = useAppSelector((state) => state.articleDetail);

  const { data: categories } = useAppSelector((state) => state.categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<PostArticlePayloadAttributes>({
    resolver: yupResolver(schema),
  });

  const {
    field: { onChange, value: content },
  } = useController({ control, name: 'content' });

  const {
    field: { value: thumbnail },
  } = useController({ control, name: 'thumbnail' });

  const onSubmitHandler = (data: PostArticlePayloadAttributes) => {
    const payload: UpdateArticlePayload = {
      articleId: Number(query.id),
      data: { ...data },
    };

    payload.data.slug = convertToSlug(payload.data.title);
    payload.data.content = payload.data.content.replaceAll(`${process.env.NEXT_PUBLIC_API_URL}`, '');

    dispatch(updateArticle(payload));
  };

  useEffect(() => {
    dispatch(getArticleById(Number(query.id)));
    dispatch(getCategories());
  }, [dispatch, query.id]);

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(resetState());
      toast.success('Updated successfully');
    }
  }, [dispatch, isUpdateSuccess]);

  useEffect(() => {
    if (article) {
      onChange(article.attributes.content);
    }
  }, [dispatch, article, onChange]);

  if (article && article.id === Number(query.id)) {
    return (
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-4">
        <ToastContainer />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm font-thin">
              <span className="text-red-500">*</span> Title
            </span>
            <Input {...register('title')} placeholder="Title" defaultValue={article.attributes.title} />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="col-span-1">
            <span className="text-sm font-thin">
              <span className="text-red-500">*</span> Category
            </span>
            <Select {...register('category')} defaultValue={article.attributes.category.data.id}>
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
            <span className="text-red-500">*</span> Thumbnail
          </span>
          <DropZone
            {...register('thumbnail')}
            files={thumbnail}
            preview={getStrapiMedia(
              article.attributes.thumbnail.data.attributes.formats.large ||
                article.attributes.thumbnail.data.attributes.formats.medium ||
                article.attributes.thumbnail.data.attributes.formats.small ||
                article.attributes.thumbnail.data.attributes.formats.thumbnail,
            )}
          />
          {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
        </div>
        <div className="mb-4">
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> Description
          </span>
          <Input {...register('description')} placeholder="Description" defaultValue={article.attributes.description} />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>
        <div className="mb-4 ">
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> Content
          </span>
          <Editor value={content} onChange={onChange} />
          {errors.content && <span className="text-red-500">{errors.content.message}</span>}
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outlined" className="mx-4" aria-label="Cancel">
            Cancel
          </Button>
          <Button loading={loading} disabled={loading} type="submit" variant="solid" className="" aria-label="Confirm">
            Confirm
          </Button>
        </div>
      </form>
    );
  }
}

UpdatePost.Layout = 'UserManagement';
