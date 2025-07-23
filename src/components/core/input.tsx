import React, { forwardRef } from 'react';

type InputProps = {
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      iconSrc = '/search.svg',
      iconAlt = 'Search',
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={`flex items-center max-w-[465px] w-[506px] h-[45px] border border-black px-4 py-2 bg-[#D9D9D9] rounded-[10px] shadow-md ${className}`}
      >
        <input
          ref={ref}
          type="text"
          className="flex-1 bg-transparent outline-none text-lg placeholder-black"
          {...rest} // includes value, onChange, onKeyDown, onKeyPress, etc.
        />
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
