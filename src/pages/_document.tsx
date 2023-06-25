import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-light-mode dark:bg-dark-mode">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
