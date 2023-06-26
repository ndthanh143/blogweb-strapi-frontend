import { storeWrapper, useAppSelector } from '@/redux/store';
import { getStrapiMedia } from '@/utils/media';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getUserDetail } from '@/redux/features/users/userSlice';
import { getArticlesByWriter } from '@/redux/features/articles/articlesFilterSlice';
import { getUsersAPI } from '@/services/user/user.service';
import { SEO } from '@/services/homepage/homepage.dto';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Avatar, Card, Seo, SocialMedia } from '@/components';

export default function Writer() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { data: user, loading: userLoading } = useAppSelector((state) => state.userDetail);
  const { data: articles, loading: articlesLoading } = useAppSelector((state) => state.articlesFilter);

  const loading = userLoading || articlesLoading;

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetail(Number(router.query.id)) as any);
    }
  }, [user, dispatch, router.query.id]);

  if (!user) {
    return null;
  }

  const seo: SEO = {
    metaTitle: user.name,
    metaDescription: user.about,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <div className="my-8">
        <div className="bg-footer-color dark:bg-search-dark py-8">
          <div className="flex justify-center">
            <Avatar
              src={user.avatar && getStrapiMedia(user.avatar.formats.thumbnail)}
              width={50}
              height={50}
              alt={(user.avatar && user.avatar.alternativeText) || ''}
              size={(user.avatar && user.avatar.formats.thumbnail + '') || ''}
            />
            <div className="mx-4">
              <p className="font-bold text-color-bold dark:text-color-bold-dark">{user.name}</p>
              <p className="text-color-thin dark:text-color-thin-dark">{user.major}</p>
            </div>
          </div>
          <p className="text-color-medium w-2/3 py-5 mx-auto text-center dark:text-color-medium-dark">{user.about}</p>
          <div className="flex justify-center">
            <SocialMedia variant="facebook" href="/" />
            <SocialMedia variant="youtube" href="/" />
            <SocialMedia variant="twitter" href="/" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
          {articles.map((item) => (
            <Card
              isLoading={articlesLoading}
              title={item.attributes.title}
              thumbnail={item.attributes.thumbnail}
              category={item.attributes.category}
              author={item.attributes.author}
              slug={item.attributes.slug}
              publishedAt={item.attributes.publishedAt}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

Writer.Layout = 'Main';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getUsersAPI();

  const paths = data.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = storeWrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params, locale }) => {
      const writerId = Number(params?.id);

      await dispatch(getUserDetail(writerId));

      await dispatch(getArticlesByWriter(writerId));

      return {
        props: {
          ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
        },
        revalidate: 5,
      };
    },
);
