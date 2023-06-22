import { getArticleDetail } from '@/redux/features/articles/articleSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useArticle = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.articleDetail);

  useEffect(() => {
    if (!data || (data.attributes.slug !== router.query.slug && loading == false)) {
      dispatch(getArticleDetail(router.query.slug as string));
    }
  }, [data, dispatch, router.query.slug, loading]);

  return { data, loading };
};
