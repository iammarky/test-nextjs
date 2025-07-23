import React, { ReactNode } from 'react';

type HeaderProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function Header({ left, center, right, children, className = '' }: HeaderProps) {
  return (
     <div className={`sticky top-0 z-50 w-full h-[96px] bg-[#5469B4] px-4 flex items-center justify-between border border-black ${className}`}>
      <div className="absolute left-4">{left}</div>
      <div className="mx-auto">{center}</div>
      <div className="absolute right-4">{right}</div>
      {children}
    </div>
  );
}
