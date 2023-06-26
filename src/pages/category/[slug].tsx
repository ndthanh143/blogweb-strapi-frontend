import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { getCategoryDetail } from '@/redux/features/categories/categorySlice';
import { storeWrapper, useAppDispatch, useAppSelector } from '@/redux/store';
import { getCategoriesAPI } from '@/services/category/category.service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { Card, Pagination, Select } from '@/components';
import { ORDER_OPTIONS, OrderEnum, PAGE_SIZE } from '@/constants';
import { getCategories } from '@/redux/features/categories/categoriesSlice';
import { getArticlesByCategory } from '@/redux/features/articles/articlesFilterSlice';
import { ImSad } from 'react-icons/im';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Category() {
  const { t } = useTranslation('category');

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderEnum>(OrderEnum.DESC);

  const [pageIndex, setPageIndex] = useState(1);

  const { data: categories } = useAppSelector((state) => state.categories);
  const { data: category, loading: categoryLoading } = useAppSelector((state) => state.categoryDetail);
  const { data: articles, loading: articlesLoading, pageCount } = useAppSelector((state) => state.articlesFilter);

  const { slug } = router.query;

  const loading = categoryLoading || articlesLoading;

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
    if (!category) {
      dispatch(getCategoryDetail(slug as string));
    } else {
      dispatch(
        getArticlesByCategory({ id: category.id, options: { page: pageIndex, pageSize: PAGE_SIZE }, sort: order }),
      );
    }
  }, [dispatch, category, slug, categories.length, order, pageIndex]);

  return (
    <div className="my-8">
      <div className="grid grid-cols-10 lg:grid-cols-8 font-semibold border-b dark:border-dark-mode my-4">
        <div className="col-span-7 lg:col-span-7 flex flex-wrap">
          {categories.map((item) => (
            <Link
              href={{ pathname: `/category/${item.attributes.slug}` }}
              className={cx(
                'px-4 py-2 cursor-pointer',
                slug === item.attributes.slug && 'text-color-primary border-b-2  border-primary',
              )}
              key={item.id}
            >
              {item.attributes.name}
            </Link>
          ))}
        </div>
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
      </div>
      {loading ? (
        <span className="flex my-32 justify-center animate-spin duration-200">
          <AiOutlineLoading />
        </span>
      ) : (
        articles &&
        articles.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles.map((item) => (
              <Card
                isLoading={loading}
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
        )
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

Category.Layout = 'Main';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getCategoriesAPI();

  const paths = data.map((item) => ({
    params: {
      slug: item.attributes.slug,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = storeWrapper.getStaticProps(({ dispatch }) => async ({ params, locale }) => {
  await dispatch(getCategories());
  await dispatch(getCategoryDetail(params?.slug as string));

  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', 'category', 'header', 'footer'])) },
    revalidate: 5,
  };
});
