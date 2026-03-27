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
    <main className="p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{country.name.official}</h1>
          <p className="text-slate-600">{country.name.common}</p>
        </div>
        <Link href="/" className="rounded bg-slate-100 px-3 py-2 text-sm">
          Volver
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.name.common}
          className="h-72 w-full rounded-xl object-cover"
        />
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Subregion:</span>{" "}
              {country.subregion || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {languages}
            </p>
            <p>
              <span className="font-semibold">Currencies:</span>{" "}
              {currencies}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
