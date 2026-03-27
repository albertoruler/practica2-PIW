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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">All countries</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Listado completo de países.</p>
          </div>
          <a href="/" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-950 transition hover:bg-white">
            Inicio
          </a>
        </div>
      </div>
      <CountriesGrid countries={countries} />
    </main>
  );
}
