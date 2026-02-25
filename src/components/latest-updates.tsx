import Link from "next/link";
import { countries } from "@/lib/regulation-data";

export function LatestUpdates() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-slate-900">Latest Country Updates</h2>
      <p className="mt-1 text-sm text-slate-600">Quick scan of the newest regulatory milestone per market.</p>

      <ul className="mt-4 space-y-3">
        {countries.map((country) => {
          const latest = country.recentChanges[0];

          return (
            <li key={country.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{country.name}</p>
                <p className="text-xs font-semibold tracking-wide text-slate-500">{latest.date}</p>
              </div>
              <p className="mt-1 text-sm text-slate-700">{latest.change}</p>
              <Link href={`/country/${country.slug}`} className="mt-2 inline-flex text-xs font-semibold text-sky-700 hover:text-sky-900">
                Open {country.name} rulebook
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
