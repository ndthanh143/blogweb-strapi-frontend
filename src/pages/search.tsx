import { searchArticles } from '@/redux/features/articles/articlesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { ImSad } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { searchUsers } from '@/redux/features/users/usersSlice';
import { getStrapiMedia } from '@/utils/media';
import { FaPencilAlt } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Avatar, Button, Card, Input, Pagination, Select, SearchPayload } from '@/components';
import { ORDER_OPTIONS, OrderEnum } from '@/constants';
import scrollToTop from '@/utils/scrollToTop';

const PAGE_SIZE = 3;

const schema = object({
  searchQuery: string().required('is Required'),
});

export default function Search() {
  const { t } = useTranslation('search');

  const router = useRouter();

  const { q, type } = router.query;

  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderEnum>(OrderEnum.DESC);

  const {
    searchData: articles,
    loading: searchArticlesLoading,
    pageCount: articlesPageCount,
  } = useAppSelector((state) => state.articles);

  const {
    searchData: users,
    loading: searchUsersLoading,
    pageCount: userPageCount,
  } = useAppSelector((state) => state.users);

  const [pageIndex, setPageIndex] = useState(1);

  const { register, handleSubmit } = useForm<SearchPayload>({ resolver: yupResolver(schema) });

  const onSubmitHandler = ({ searchQuery }: SearchPayload) => {
    router.push(`/search?q=${searchQuery}` + (type ? `&type=${type}` : ''));
  };

  const loading = searchUsersLoading || searchArticlesLoading;
  const pageCount = type === 'authors' ? userPageCount : articlesPageCount;

  const translate = {
    search: t('search'),
    posts: t('posts'),
    authors: t('authors'),
    noResult: t('noResult'),
    latest: t('latest'),
    oldest: t('oldest'),
  };

  useEffect(() => {
    if (typeof q === 'string') {
      if (type === 'authors') {
        dispatch(searchUsers({ query: q, options: { page: pageIndex, pageSize: PAGE_SIZE } }));
      } else {
        dispatch(searchArticles({ query: q, options: { page: pageIndex, pageSize: PAGE_SIZE }, sort: order }));
      }
    }
    scrollToTop();
  }, [q, type, router.query, pageIndex, dispatch, order]);

  return (
    <div className="py-4">
      <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="col-span-9 lg:col-span-10">
          <Input {...register('searchQuery')} placeholder="Search" defaultValue={q} className="text-sm" />
        </div>
        <Button variant="solid" className="col-span-3 lg:col-span-2" aria-label={translate.search}>
          <BiSearch />
          <span className="pl-2 text-sm">{translate.search}</span>
        </Button>
      </form>
      <div className="grid grid-cols-11 font-semibold border-b items-center dark:border-dark-mode my-4">
        <div className={cx('col-span-8 lg:col-span-10 py-2')}>
          <Link
            href={{ pathname: '/search', query: { q, type: 'posts' } }}
            className={cx(
              'px-4 py-2 cursor-pointer',
              (type === 'posts' || !type) && 'text-blue-500 border-b-2 border-blue-500',
            )}
          >
            {translate.posts}
          </Link>
          <Link
            href={{ pathname: '/search', query: { q, type: 'authors' } }}
            className={cx('px-4 py-2 cursor-pointer', type === 'authors' && 'text-blue-500 border-b-2 border-blue-500')}
          >
            {translate.authors}
          </Link>
        </div>
        {(type === 'posts' || !type) && (
          <div className="col-span-3 lg:col-span-1">
            <Select
              defaultValue="desc"
              onChange={(e) => setOrder(e.target.value as OrderEnum)}
              className="!border-0 outline-none "
            >
              {ORDER_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      {!loading && type === 'authors' ? (
        users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {users.map((item) => (
              <Link
                href={`/writer/${item.id}`}
                className="flex hover:bg- dark:hover:bg-blue-300 p-4 rounded-md"
                key={item.id}
              >
                <Avatar
                  src={item.avatar && getStrapiMedia(item.avatar.formats.thumbnail)}
                  width={50}
                  height={50}
                  alt={item.avatar?.alternativeText || ''}
                  size={item.avatar?.formats.thumbnail + '' || ''}
                />
                <div className="px-4 font-bold">
                  {item.name}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center text-color-thin dark:text-color-thin-dark text-sm col-span-1">
                      <FaPencilAlt className="mx-2" />
                      {item.articles.length}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="px-2">{translate.noResult}</span> <ImSad />
          </div>
        )
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((item) => (
            <Card
              isLoading={searchArticlesLoading}
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
      ) : (
        <div className="flex items-center justify-center">
          <span className="px-2">{translate.noResult}</span> <ImSad />
        </div>
      )}

      <Pagination
        pageCount={pageCount}
        pageRangeDisplayed={2}
        onPageChange={(e) => setPageIndex(e.selected + 1)}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

Search.Layout = 'Main';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer', 'search'])) },
  };
};
