import { ActionCenterLoader } from "@/components/action-center-loader";

export default function ActionCenterPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-slate-500">COMPLIANCE OPERATIONS</p>
        <h1 className="font-display mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Action Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700">
          Track remediation work with owners, due dates, completion status, audit history, and CSV exports.
        </p>
      </section>

      <section className="mt-6">
        <ActionCenterLoader />
      </section>
    </main>
  );
}
