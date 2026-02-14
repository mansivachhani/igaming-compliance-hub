import Link from "next/link";
import {
  CountryRegulation,
  overallStatus,
  statusCount,
} from "@/lib/regulation-data";
import { StatusBadge } from "@/components/status-badge";

type CountryCardProps = {
  country: CountryRegulation;
  progress?: {
    completed: number;
    total: number;
    overdue: number;
  };
};

export function CountryCard({ country, progress }: CountryCardProps) {
  const overall = overallStatus(country);
  const counts = statusCount(country);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900">{country.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{country.regulator}</p>
        </div>
        <StatusBadge status={overall} />
      </header>

      <p className="mb-4 text-sm text-slate-700">{country.summary}</p>

      <dl className="mb-5 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-rose-50 p-2">
          <dt className="text-rose-700">Action</dt>
          <dd className="text-lg font-semibold text-rose-900">{counts["Action Needed"]}</dd>
        </div>
        <div className="rounded-lg bg-amber-50 p-2">
          <dt className="text-amber-700">Risk</dt>
          <dd className="text-lg font-semibold text-amber-900">{counts["At Risk"]}</dd>
        </div>
        <div className="rounded-lg bg-emerald-50 p-2">
          <dt className="text-emerald-700">OK</dt>
          <dd className="text-lg font-semibold text-emerald-900">{counts.Compliant}</dd>
        </div>
      </dl>

      {progress ? (
        <div className="mb-4 rounded-lg bg-slate-100 p-2 text-xs text-slate-700">
          <p>
            Completion: <span className="font-semibold text-slate-900">{progress.completed}/{progress.total}</span>
          </p>
          <p>
            Overdue: <span className="font-semibold text-rose-700">{progress.overdue}</span>
          </p>
        </div>
      ) : null}

      <Link
        href={`/country/${country.slug}`}
        className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Open rulebook
      </Link>
    </article>
  );
}
