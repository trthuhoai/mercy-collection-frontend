import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type IProps = {
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'outline' | 'contained' | 'transparent';
  color?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      className,
      type = 'button',
      variant = 'contained',
      color = 'primary',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'py-2 px-4 min-w-[112px] outline-none rounded-lg hover:ring-2 transition-all text-white',
          {
            'bg-green-900 hover:bg-green-800 ring-green-700':
              color === 'primary',
          },
          {
            'bg-white !text-black hover:bg-gray-200 ring-gray-200':
              color === 'secondary',
          },
          {
            'bg-transparent':
              variant === 'outline' || variant === 'transparent',
          },
          {
            '!p-0 !min-w-fit hover:!bg-transparent hover:ring-0 !text-white hover:!text-gray-500':
              variant === 'transparent',
          },
          {
            'outline-1 outline-gray-900': variant === 'outline',
          },
          {
            'outline-gray-900': variant === 'outline' && color === 'secondary',
          },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Button;
