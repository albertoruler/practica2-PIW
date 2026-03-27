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
    <main className="p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Countries</h1>
          <p className="text-slate-700 dark:text-slate-200">
            Navegación multi-página y buscador por nombre.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="/all" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            All
          </a>
          <a href="/region/africa" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Africa
          </a>
          <a href="/region/americas" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Americas
          </a>
          <a href="/region/asia" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Asia
          </a>
          <a href="/region/europe" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Europe
          </a>
          <a href="/region/oceania" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Oceania
          </a>
        </div>
      </div>
      <CountriesGrid countries={countries} />
    </main>
  );
}
