"use client";

import { useMemo, useState } from "react";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";

export default function CountriesGrid({ countries }: { countries: any[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.name.common.localeCompare(b.name.common)),
    [countries, search]
  );

  return (
    <div className="space-y-6">
      <SearchBar value={search} onChange={setSearch} />
      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-10 text-center text-slate-400 shadow-lg shadow-slate-950/20">
          No hay países que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
