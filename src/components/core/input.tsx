import React from 'react';

export default function Input() {
  return (
    <div className="flex items-center max-w-[465px] w-[506px] h-[45px] border border-black px-4 py-2 bg-[#D9D9D9] rounded-[10px] shadow-md">
      <input
        type="text"
        placeholder="Search here..."
        className="flex-1 bg-transparent outline-none text-lg placeholder-black"
      />
      <img src="/search.svg" alt="Search" className="w-6 h-6" />
    </div>
  );
}
