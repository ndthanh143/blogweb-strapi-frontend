import React, { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import cx from 'classnames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'solid' | 'outlined' | 'text';
  loading?: boolean;
  loadingPosition?: 'start' | 'end';
}

export function Button({
  variant,
  loading,
  loadingPosition = 'start',
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={cx(
        variant === 'solid' &&
          'bg-color-primary text-white hover:bg-color-primary-hover active:color-primary-active flex justify-center items-center border-transparent',
        variant === 'outlined' &&
          'text-color-thin  dark:border-dark-mode dark:text-color-thin-dark hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-500 dark:active:bg-blue-700 dark:active:border-blue-700',
        variant === 'text' && 'hover:bg-gray-200 dark:hover:bg-slate-500 border-transparent',
        'py-2 px-4 rounded-md font-semibold border',
        loading && 'opacity-60 hover:bg-none active:bg-none',
        props.disabled && 'opacity-60',
        className,
      )}
    >
      {loading && loadingPosition == 'start' && <AiOutlineLoading3Quarters className="animate-spin-fast mx-2" />}
      {children}
      {loading && loadingPosition == 'end' && <AiOutlineLoading3Quarters className="animate-spin-fast mx-2" />}
    </button>
  );
}
