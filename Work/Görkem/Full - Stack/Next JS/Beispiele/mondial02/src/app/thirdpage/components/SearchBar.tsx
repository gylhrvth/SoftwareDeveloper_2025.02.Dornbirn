"use client";

import { ChangeEvent } from "react";
import { ChevronDown, Search } from "lucide-react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};
export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search input"
        className="w-full pl-10 pr-8 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition"
      />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-200 w-5 h-5" />
    </div>
  );
}