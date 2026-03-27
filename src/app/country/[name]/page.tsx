import Link from "next/link";
import { notFound } from "next/navigation";

async function getCountry(name: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function CountryPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getCountry(params.name);
  const country = data?.[0];

  if (!country) {
    notFound();
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency: any) => currency.name)
        .join(", ")
    : "N/A";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">{country.name.official}</h1>
            <p className="mt-2 text-slate-400">{country.name.common}</p>
          </div>
          <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-950 transition hover:bg-white">
            Volver
          </Link>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/20">
          <img
            src={country.flags.svg || country.flags.png}
            alt={country.name.common}
            className="h-72 w-full object-cover"
          />
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="space-y-4 text-slate-300">
            <p>
              <span className="font-semibold text-white">Capital:</span> {country.capital?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-white">Subregion:</span> {country.subregion || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-white">Population:</span> {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <p>
              <span className="font-semibold text-white">Languages:</span> {languages}
            </p>
            <p>
              <span className="font-semibold text-white">Currencies:</span> {currencies}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
