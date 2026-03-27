"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="country-search">
        Buscar país
      </label>
      <input
        id="country-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar país"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:border-sky-500 focus:outline-none"
      />
    </div>
  );
}
