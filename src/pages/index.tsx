import { HomepageData } from '@/services/homepage/homepage.dto';
import { getArticles, getMoreArticles } from '@/redux/features/articles/articlesSlice';
import { storeWrapper, useAppDispatch, useAppSelector } from '@/redux/store';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import { getHomepageAPI } from '@/services/homepage/homepage.service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Button, Card, Slider, Seo, DropZone } from '@/components';
import { PAGE_SIZE } from '@/constants';

export default function Home({ homepage }: InferGetStaticPropsType<GetStaticProps>) {
  const { t } = useTranslation('home');

  const dispatch = useAppDispatch();

  const { loading, data, nextPage: page, isMaximum } = useAppSelector((state) => state.articles);

  const handleLoadMore = () => {
    dispatch(getMoreArticles({ page, pageSize: PAGE_SIZE }));
  };

  useEffect(() => {
    if (!data) {
      dispatch(getArticles({ page: 1, pageSize: PAGE_SIZE }));
    }
  }, [dispatch, data]);

  const translate = {
    titleContent: t('titleContent'),
    viewMore: t('viewMore'),
  };

  return (
    <div className="my-4">
      <button
        onClick={() => {
          window.location.href = 'googlechrome://tracnghiemtinhcach.vn';
        }}
      >
        Go to another app
      </button>
      <Seo seo={homepage.attributes.seo} />
      <Slider data={data.slice(0, PAGE_SIZE)} />
      <h1 className="text-xl font-bold mt-16 mb-4">{translate.titleContent}</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((item) => (
          <Card
            isLoading={loading}
            title={item.attributes.title}
            thumbnail={item.attributes.thumbnail}
            category={item.attributes.category}
            author={item.attributes.author}
            slug={item.attributes.slug}
            publishedAt={item.attributes.publishedAt}
            key={item.id}
            isRendered
          />
        ))}
      </div>
      {!isMaximum && (
        <div className="lg:flex justify-center">
          <Button
            variant="outlined"
            className="flex justify-center items-center my-8 mx-auto w-full lg:w-fit"
            onClick={handleLoadMore}
            loading={loading}
            disabled={loading}
            aria-label={translate.viewMore}
          >
            {translate.viewMore}
          </Button>
        </div>
      )}
    </div>
  );
}

Home.Layout = 'Main';

export const getStaticProps: GetStaticProps<{ homepage: HomepageData }> = storeWrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ locale }) => {
      const { data } = await getHomepageAPI();

      await dispatch(getArticles({ page: 1, pageSize: PAGE_SIZE }));

      return {
        props: {
          homepage: data,
          ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'header', 'footer'])),
        },
        revalidate: 5,
      };
    },
);
