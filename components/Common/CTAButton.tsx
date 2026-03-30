'use client';

import React, { ReactNode } from 'react';
import Spinner from './Spinner';

type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'outlined-black'
  | 'warning';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant = 'filled',
  loading = false,
  className = '',
  disabled = false,
  children,
  ...props
}) => {
  const baseClasses =
    'flex gap-10 items-center w-full !px-5 !py-3 justify-center rounded-xl font-bold text-xl transition-all duration-200 focus:outline-none focus:ring-2';

  const typeClasses: Record<ButtonVariant, string> = {
    filled: 'bg-dark-blue text-white',
    outlined: 'border-[1px] border-dark-blue text-dark-blue',
    'outlined-black': 'border-[1px] text-black',
    warning: 'bg-bright-red opacity-50 text-white',
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      type="button"
      disabled={loading || disabled}
      className={`${baseClasses} border-bl ${typeClasses[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  );
};

export default CTAButton;
