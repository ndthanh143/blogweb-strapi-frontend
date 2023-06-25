import Image from 'next/image';

export default function Custom500() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image src="/owl.png" width={200} height={200} alt="owl 404" className="mx-auto animate-bounce" />
        <p className="mx-auto text-6xl">500 - SHARK BITTEN THE SERVER</p>
      </div>
    </div>
  );
}

Custom500.Layout = 'Empty';
