import Link from "next/link";
import CountriesGrid from "../../components/CountriesGrid";
import { notFound } from "next/navigation";

async function getRegion(region: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}?fields=name,flags,population,cca3`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

function capitalize(value?: string) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;

  if (!region) {
    notFound();
  }

  const countries = (await getRegion(region)) ?? [];
  const regionLabel = capitalize(region) || "Desconocida";

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

      {countries.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
          No se han encontrado países para la región {regionLabel}.
        </div>
      ) : (
        <CountriesGrid countries={countries} />
      )}
    </main>
  );
}