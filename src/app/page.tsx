import Link from "next/link";
import CountriesGrid from "./components/CountriesGrid";

async function getCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,cca3",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching countries");
  }

  return res.json();
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">Countries</h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/all" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-950 transition hover:bg-white">
              All
            </Link>
            <Link href="/region/africa" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              Africa
            </Link>
            <Link href="/region/americas" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              Americas
            </Link>
            <Link href="/region/asia" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              Asia
            </Link>
            <Link href="/region/europe" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              Europe
            </Link>
            <Link href="/region/oceania" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
              Oceania
            </Link>
          </div>
        </div>
      </div>
      <CountriesGrid countries={countries} />
    </main>
  );
}
