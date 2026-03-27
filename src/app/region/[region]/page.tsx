import CountriesGrid from "../../components/CountriesGrid";

async function getRegion(region: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,cca3`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching region");
  }

  return res.json();
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function RegionPage({
  params,
}: {
  params: { region: string };
}) {
  const countries = await getRegion(params.region);

  return (
    <main className="p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{capitalize(params.region)}</h1>
          <p className="text-slate-700 dark:text-slate-200">
            Países de la región {capitalize(params.region)}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="/" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            Inicio
          </a>
          <a href="/all" className="rounded bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200">
            All
          </a>
        </div>
      </div>
      <CountriesGrid countries={countries} />
    </main>
  );
}
