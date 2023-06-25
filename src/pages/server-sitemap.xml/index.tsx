import { getArticlesAPI } from '@/services/article/article.service';
import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articles = await getArticlesAPI();

  const fields: ISitemapField[] = articles.data.map((article) => ({
    loc: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.attributes.slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Site() {}
