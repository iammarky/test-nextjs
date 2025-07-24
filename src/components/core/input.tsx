import React, { forwardRef } from 'react';

type InputProps = {
  iconSrc?: string;
  iconAlt?: string;
  onIconClick?: () => void;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      iconSrc = '',
      iconAlt = 'Search',
      onIconClick,
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
        {iconSrc && (
          <button
            type="button"
            onClick={onIconClick}
            className="ml-2 p-1"
          >
            <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
