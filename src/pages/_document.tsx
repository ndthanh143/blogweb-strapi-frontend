import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || 'en';

    return (
      <Html lang={currentLocale}>
        <Head />
        <body className="bg-white dark:bg-dark-mode">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
