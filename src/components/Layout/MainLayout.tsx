import { PropsWithChildren } from 'react';
import { Header, Footer, ScrollTopButton } from '@/components';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="fixed top-0 w-full lg:w-auto lg:static z-10 dark:bg-dark-mode bg-light-mode">
        <Header />
      </div>
      <main className="mt-44 lg:mt-0 container mx-auto">{children}</main>
      <ScrollTopButton />
      <Footer />
    </>
  );
}
