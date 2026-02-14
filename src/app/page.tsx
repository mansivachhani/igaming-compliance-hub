import { Heatmap } from "@/components/heatmap";
import Link from "next/link";
import { DashboardCountryCardsLoader } from "@/components/dashboard-country-cards-loader";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="hero-glow" aria-hidden="true" />
        <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-slate-700">
          iGAMING COMPLIANCE COMMAND CENTER
        </p>
        <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Cross-Country Gambling Regulation Navigator
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-700 sm:text-base">
          Centralized checklist and risk view for UK, Sweden, Italy, and Spain. Designed so legal and compliance teams can find obligations quickly and prove control coverage.
        </p>
      </section>

      <DashboardCountryCardsLoader />

      <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Heatmap />
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold text-slate-900">Action Workflow</h2>
          <p className="mt-1 text-sm text-slate-600">
            Open Action Center for owner assignment, due dates, completion tracking, audit logs, and CSV export.
          </p>

          <div className="mt-4 rounded-xl bg-slate-900 p-4 text-white">
            <h3 className="text-sm font-semibold tracking-wide">Review cadence</h3>
            <ul className="mt-2 space-y-2 text-xs text-slate-200">
              <li>Monthly regulatory change scan</li>
              <li>Quarterly legal signoff</li>
              <li>Immediate update after regulator notices</li>
            </ul>
          </div>

          <Link
            href="/action-center"
            className="mt-5 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
          >
            Open Action Center
          </Link>
        </aside>
      </section>
    </main>
  );
}
