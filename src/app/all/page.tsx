import CountriesGrid from "../components/CountriesGrid";

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

export default async function AllPage() {
  const countries = await getCountries();

  return (
    <main className="p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">All countries</h1>
          <p className="text-slate-700 dark:text-slate-200">
            Listado completo de países.
          </p>
        </div>
        <a href="/" className="rounded bg-slate-100 px-3 py-2 text-sm text-slate-900 hover:bg-slate-200">
          Inicio
        </a>
      </div>
      <CountriesGrid countries={countries} />
    </main>
  );
}
