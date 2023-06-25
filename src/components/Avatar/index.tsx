import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HiUserCircle } from 'react-icons/hi';

type HandleChange = (data: FileList | null) => void;

export type AvatarProps = {
  src?: string;
  width: number;
  height: number;
  alt: string;
  size: string;
  onClick?: () => void;
} & (({ isPicker: true } & { onChange: HandleChange }) | ({ isPicker?: false } & { onChange?: HandleChange }));

export function Avatar({ src, width, height, alt, size, isPicker, onClick, onChange }: AvatarProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  return (
    <div
      className="rounded-full overflow-hidden cursor-pointer relative hover:opacity-60"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {previewUrl ? (
        <Image
          src={previewUrl.replace(/\/v\d+\//g, '/q_40/')}
          fill
          quality={100}
          alt={alt}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          sizes={size}
        />
      ) : src ? (
        <Image
          src={src.replace(/\/v\d+\//g, '/q_40/')}
          fill
          quality={100}
          alt={alt}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          sizes={size}
          priority
        />
      ) : (
        <HiUserCircle className="w-full h-full text-gray-400 dark:text-white" />
      )}
      {isPicker && (
        <label
          htmlFor="imagePicker"
          className="absolute font-bold w-full h-full top-0 left-0 rounded-full flex items-center text-center hover:bg-gray-200 hover:bg-opacity-30 text-transparent hover:text-black cursor-pointer z-20"
        >
          Choose Image
          <input
            id="imagePicker"
            type="file"
            hidden
            onChange={(e) => {
              setFile(e.target.files && e.target.files?.[0]);
              onChange(e.target.files);
            }}
          />
        </label>
      )}
    </div>
  );
}
