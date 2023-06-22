import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import cx from 'classnames';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startDecorator, endDecorator, className, disabled, ...props }: InputProps, ref) => {
    return (
      <div className="relative flex items-center">
        {startDecorator && <span className="text-color-thin text-xl pl-3 absolute left-0">{startDecorator}</span>}
        <input
          ref={ref}
          disabled={disabled}
          className={cx(
            'px-4 py-2 w-full bg-transparent dark:text-gray-200 border-2 rounded-lg dark:border-dark-mode',
            startDecorator && 'pl-12',
            endDecorator && 'pr-12',
            disabled && 'opacity-50',
            className,
          )}
          {...props}
        />
        {endDecorator && <span className="text-color-thin text-xl absolute pr-3 right-0">{endDecorator}</span>}
      </div>
    );
  },
);

export { Input };
