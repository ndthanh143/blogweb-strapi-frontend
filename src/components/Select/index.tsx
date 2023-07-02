import { DetailedHTMLProps, SelectHTMLAttributes, forwardRef } from 'react';
import cx from 'classnames';

export type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cx(
        'pl-4 py-2 w-full bg-transparent dark:bg-dark-mode dark:text-gray-200 border-2 rounded-lg dark:border-dark-mode placeholder-gray-400 cursor-pointer',
        className,
      )}
      {...props}
    />
  );
});

export { Select };
