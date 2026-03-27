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
        className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-3 text-slate-100 shadow-xl shadow-slate-950/20 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10"
      />
    </div>
  );
}
