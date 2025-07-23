// components/core/dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';

type Option<T> = Readonly<{
  label: string;
  value: T;
}>;

type DropdownProps<T extends string> = {
  value: T | '';
  onChange: (value: T) => void;
  options: readonly Option<T>[];
  placeholder?: string;
};

export default function Dropdown<T extends string>({
  value,
  onChange,
  options,
  placeholder = 'Select',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-3 py-2 h-[35px] bg-white border border-gray-300 rounded-md font-semibold shadow-sm"
      >
        <span>{selectedLabel}</span>
        { isOpen ? (
          <img src="/chevron-up.svg" alt="chevron-up" className="w-6 h-6 ml-2" />
        ) :
        (
          <img src="/chevron-down.svg" alt="chevron-down" className="w-6 h-6 ml-2" />
        )}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 overflow-hidden">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer font-semibold h-[35px] ${
                value === opt.value ? 'bg-[#4354906E]' : 'hover:bg-[#4354906E]'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
