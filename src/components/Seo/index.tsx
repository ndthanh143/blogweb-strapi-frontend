import { SEO } from '@/services/homepage/homepage.dto';
import { GlobalContext } from '@/pages/_app';
import { getStrapiMedia } from '@/utils/media';
import Head from 'next/head';
import { useContext } from 'react';

const Seo: React.FC<{ seo: SEO }> = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext);

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle}` + (siteName ? ` | ${siteName}` : ''),
    shareImage:
      seoWithDefaults.shareImage && getStrapiMedia(seoWithDefaults.shareImage.data.attributes.formats.thumbnail),
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export { Seo };
