"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CountriesGrid from "../../components/CountriesGrid";

type Country = {
  name: { common: string };
  flags: { png: string };
  population: number;
};

function capitalize(value?: string) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function RegionClient({ initialRegion }: { initialRegion?: string }) {
  const params = useParams();
  const rawRegion = params?.region;
  const region = Array.isArray(rawRegion)
    ? rawRegion.join("/")
    : rawRegion ?? initialRegion ?? "";
  const regionLabel = capitalize(region) || "Desconocida";
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(Boolean(region));
  const [error, setError] = useState(!region);

  useEffect(() => {
    if (!region) {
      return;
    }

    const controller = new AbortController();

    const loadRegion = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,cca3`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Error fetching region");
        }

        const data = await res.json();
        setCountries(data ?? []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadRegion();

    return () => controller.abort();
  }, [region]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">{regionLabel}</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Países de la región {regionLabel}.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-950 transition hover:bg-white">
              Inicio
            </Link>
            <Link href="/all" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              All
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
          Cargando países...
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
          No se ha podido cargar la región. Comprueba la ruta e inténtalo de nuevo.
        </div>
      ) : (
        <CountriesGrid countries={countries} />
      )}
    </main>
  );
}
