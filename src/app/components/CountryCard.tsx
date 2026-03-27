import Link from "next/link";

export default function CountryCard({ country }: { country: any }) {
  return (
    <Link href={`/country/${country.name.common}`}>
      <div className="m-2 overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="mb-4 h-28 w-full rounded-lg border border-slate-200 object-cover"
        />
        <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {country.name.common}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Population: {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </p>
      </div>
    </Link>
  );
}