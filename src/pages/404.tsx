import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image src="/owl.png" width={200} height={200} alt="owl 404" className="mx-auto animate-bounce" />
        <p className="mx-auto text-6xl">404 - PAGE NOT FOUND</p>
        <div className="mt-4 text-center ">
          <p className="mx-auto">The page you are looking for doesn&apos;t exits or an other error occurred.</p>
          <p className="mx-auto">Go back for your safe !!!!</p>
        </div>
      </div>
    </div>
  );
}

Custom404.Layout = 'Empty';
