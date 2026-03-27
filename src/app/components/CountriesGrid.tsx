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
    <div>
      <SearchBar value={search} onChange={setSearch} />
      {filtered.length === 0 ? (
        <p className="text-center text-slate-500">
          No hay países que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
