import React from 'react';

type Option<T> = {
  label: string;
  value: T;
};

type ToggleOptionsProps<T extends string> = {
  value: T | '';
  onChange: (value: T) => void;
  options: readonly Option<T>[];
  name?: string; // for radio grouping
};

export default function ToggleOptions<T extends string>({
  value,
  onChange,
  options,
  name = 'toggle-options',
}: ToggleOptionsProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-600 text-[18px]">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
