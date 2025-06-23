import React from 'react';
import Spinner from './Spinner';

// Button type options: 'filled', 'outlined', 'outline-black', 'warning'
function CTAButton({
  type = 'filled', 
  onClick, 
  children, 
  className = '', 
  disabled = false,
  loading = false,
  ...props
}) {
  // Base classes that apply to all buttons
  const baseClasses = 'flex gap-10 items-center w-full !px-5 !py-3 justify-center rounded-xl font-bold text-xl transition-all duration-200 focus:outline-none focus:ring-2';
  
  // Type-specific classes
  const typeClasses = {
    filled: 'bg-dark-blue text-white ',
    outlined: 'border-[1px] border-dark-blue text-dark-blue',
    'outlined-black': 'border-[1px] text-black',
    warning: 'bg-bright-red  opacity-50 text-white ',
  };
  
  // Disabled state classes
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';

  
  return (

    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClasses} border-bl ${typeClasses[type]} ${disabledClasses} ${className}`}
      {...props}
    >
      {loading ? (<Spinner/>) : null}
      {!loading ? (children) : null}
    </button>
  );
}


export default CTAButton;