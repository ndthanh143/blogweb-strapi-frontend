import Link from 'next/link';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

export interface SocialMediaProps {
  variant: 'facebook' | 'twitter' | 'youtube';
  href: string;
}

export function SocialMedia({ variant, href }: SocialMediaProps) {
  return (
    <Link
      href={href}
      className="text-white bg-social-media inline-block rounded-md p-2 mx-2 text-xl hover:bg-gray-600 cursor-pointer"
    >
      {variant === 'youtube' && <FaYoutube />}
      {variant === 'twitter' && <FaTwitter />}
      {variant === 'facebook' && <FaFacebook />}
    </Link>
  );
}
