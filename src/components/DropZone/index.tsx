import cx from 'classnames';
import { useEffect, useState, DragEvent, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Image from 'next/image';

export interface DropZoneProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  files: FileList;
  preview?: string;
}

export const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
  ({ files, preview, ...props }: DropZoneProps, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    };

    useEffect(() => {
      if (files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewUrl(null);
      }

      if (preview) {
        setPreviewUrl(preview);
      }
    }, [files, preview]);

    return (
      <div
        className="rounded-lg overflow-hidden justify-center w-full h-64 relative cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl && (
          <Image
            src={previewUrl}
            fill
            quality={100}
            alt={'preview'}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            sizes={''}
          />
        )}
        <label
          htmlFor="dropzone-file"
          className={cx(
            ' absolute flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600',
            previewUrl && 'opacity-0 hover:opacity-60',
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input ref={ref} id="dropzone-file" type="file" className="hidden" {...props} />
        </label>
      </div>
    );
  },
);
