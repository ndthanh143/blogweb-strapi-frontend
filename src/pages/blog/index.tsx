import React, { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AllPost() {
  return <div>this is blog</div>;
}

AllPost.Layout = 'Main';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'en', ['common', '', 'header', 'footer'])) },
    revalidate: 10,
  };
};
