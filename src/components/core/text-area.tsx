import React from 'react';
import Image from 'next/image';

type ValidationStatus = 'success' | 'error' | 'warning';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  validation?: ValidationStatus;
  resizable?: boolean;
  height?: string | number; // can be Tailwind height class or inline px/rem
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

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, validation, resizable = false, height, className = '', ...props }, ref) => {
    const borderClass = validation ? borderMap[validation] : 'border-gray-300';
    const iconSrc = validation ? iconMap[validation] : null;

    const heightStyle = typeof height === 'number'
      ? { height: `${height}px` }
      : typeof height === 'string' && !height.startsWith('h-')
      ? { height }
      : undefined;

    const resizeClass = resizable ? 'resize-y' : 'resize-none';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[20px] font-[400] text-black mb-1 uppercase tracking-[0.2em]">
            {label}
          </label>
        )}
        <div
          className={`relative w-full bg-white rounded-md border px-2 py-2 ${borderClass} ${className}`}
        >
          <textarea
            ref={ref}
            style={{ ...heightStyle, minHeight: '25px' }}
            className={`block ${resizeClass} w-full bg-transparent px-2 focus:outline-none text-gray-800 placeholder-gray-400`}
            {...props}
          />
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${validation} icon`}
              width={12}
              height={12}
              className="absolute top-2 right-2"
            />
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
