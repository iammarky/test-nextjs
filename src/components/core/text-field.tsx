import React from 'react';
import Image from 'next/image';

type ValidationStatus = 'success' | 'error' | 'warning';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validation?: ValidationStatus;
  errorMessage?: string;
}

const borderMap: Record<ValidationStatus, string> = {
  success: 'border-green-500',
  error: 'border-red-500',
  warning: 'border-orange-400',
};

const iconMap: Record<ValidationStatus, string> = {
  success: '/success.svg',
  error: '/error.svg',
  warning: '/warning.svg',
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, validation, errorMessage, className = '', ...props }, ref) => {
    const borderClass = validation ? borderMap[validation] : 'border-gray-300';
    const iconSrc = validation ? iconMap[validation] : null;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[20px] font-[400] text-black mb-1 uppercase tracking-[0.2em]">
            {label}
          </label>
        )}
        <div
          className={`flex items-center w-full px-4 py-2 bg-white rounded-md border h-[40px] ${borderClass} ${className}`}
        >
          <input
            ref={ref}
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            {...props}
          />
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${validation} icon`}
              width={12}
              height={12}
              className="ml-2"
            />
          )}
        </div>
        {validation === 'error' && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
