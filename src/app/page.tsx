import Link from "next/link";
import { DashboardCountryCardsLoader } from "@/components/dashboard-country-cards-loader";
import { LatestUpdates } from "@/components/latest-updates";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="hero-glow" aria-hidden="true" />
        <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-slate-700">
          iGAMING COMPLIANCE COMMAND CENTER
        </p>
        <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          iGaming Compliance Hub
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-700 sm:text-base">
          One place for legal and compliance teams to track UK, Sweden, Italy, and Spain obligations, prioritize actions, and keep evidence ready.
        </p>
      </section>

      <DashboardCountryCardsLoader />

      <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <LatestUpdates />
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold text-slate-900">Quick Start</h2>
          <p className="mt-1 text-sm text-slate-600">
            Follow this flow each week to stay compliant and reduce licensing risk.
          </p>
          <ol className="mt-4 space-y-2 text-sm text-slate-700">
            <li>1. Open a country rulebook and review latest changes.</li>
            <li>2. Track remediation in Action Center with owner and due date.</li>
            <li>3. Export CSV for legal/compliance review meeting.</li>
          </ol>

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
