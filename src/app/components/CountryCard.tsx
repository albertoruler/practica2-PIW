import Link from "next/link";

export default function CountryCard({ country }: { country: any }) {
  return (
    <Link
      href={`/country/${country.name.common}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-slate-800/90"
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{country.name.common}</h3>
        <p className="mt-2 text-sm text-slate-400">
          Population: {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </p>
      </div>
    </Link>
  );
}
