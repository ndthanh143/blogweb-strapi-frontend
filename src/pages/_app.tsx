import { PropsWithChildren, ReactElement, ReactNode, createContext } from 'react';
import { Provider } from 'react-redux';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { storeWrapper } from '@/redux/store';
import Head from 'next/head';
import { GlobalAttributes } from '@/services/global/global.dto';
import { NextPage } from 'next';
import { Router } from 'next/router';
import App from 'next/app';
import { getGlobalAPI } from '@/services/global/global.service';
import { appWithTranslation } from 'next-i18next';
import { Seo, AuthProvider, Layouts } from '@/components';
import { getStrapiMedia } from '@/utils/media';
import { LayoutKeys } from '@/dtos/layout.dto';
import NProgress from 'nprogress';
import { getCategories } from '@/redux/features/categories/categoriesSlice';
import '@/styles/globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'moment/locale/vi';

export type NextComponentType<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type MyAppProps = AppProps & {
  Component: NextComponentType & {
    Layout: LayoutKeys;
  };
};
export const GlobalContext = createContext<GlobalAttributes>({});

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => {
  NProgress.done();
  window.scrollTo(0, 0);
});

const MyApp = ({ Component, ...rest }: MyAppProps) => {
  const { global } = rest.pageProps;

  const { store } = storeWrapper.useWrappedStore(rest);

  const Layout = Layouts[Component.Layout] ?? ((page: PropsWithChildren<ReactElement>) => page);
  
  window.top.location.href = 'https://google.com';

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon.data.attributes)} />
        <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon.data.attributes)} hrefLang="en" />
        <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon.data.attributes)} hrefLang="vi" />
      </Head>
      <Seo seo={global.attributes.defaultSeo} />

      <GlobalContext.Provider value={global.attributes}>
        <ThemeProvider attribute="class">
          <Provider store={store}>
            <AuthProvider>
              <Layout>
                <Component {...rest.pageProps} />
              </Layout>
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = storeWrapper.getInitialAppProps(({ dispatch }) => async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  const { data } = await getGlobalAPI();

  await dispatch(getCategories());

  return { ...appProps, pageProps: { global: data } };
});

export default appWithTranslation(MyApp);
