import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistTable } from "@/components/checklist-table";
import { StatusBadge } from "@/components/status-badge";
import { countries, domainAnchor, overallStatus } from "@/lib/regulation-data";

type CountryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = countries.find((entry) => entry.slug === slug);

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Back to dashboard
      </Link>

      <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-slate-500">{country.regulator}</p>
            <h1 className="font-display mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {country.name} Rulebook
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-700">{country.summary}</p>
          </div>
          <StatusBadge status={overallStatus(country)} />
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-3">
            <dt className="text-xs text-slate-500">Legal basis</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{country.legalBasis}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 p-3">
            <dt className="text-xs text-slate-500">Last reviewed</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{country.lastReviewed}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 p-3">
            <dt className="text-xs text-slate-500">Top risk count</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{country.topRisks.length}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold text-slate-900">Top Risk Signals</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {country.topRisks.map((risk) => (
              <li key={risk} className="rounded-lg bg-rose-50 px-3 py-2 text-rose-900">
                {risk}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold text-slate-900">Recent Regulatory Milestones</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {country.recentChanges.map((change) => (
              <li key={`${change.date}-${change.change}`} className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold tracking-wide text-slate-500">{change.date}</p>
                <p className="mt-1 text-slate-800">{change.change}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 space-y-5">
        {country.domains.map((domain) => (
          <div id={domainAnchor(domain.domain)} key={domain.domain} className="scroll-mt-6">
            <ChecklistTable domain={domain} />
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-xl font-bold text-slate-900">Primary Sources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {country.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-sky-700 hover:text-sky-900"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
