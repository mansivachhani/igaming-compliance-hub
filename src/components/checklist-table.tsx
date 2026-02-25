import { DomainBlock } from "@/lib/regulation-data";
import { StatusBadge } from "@/components/status-badge";

type ChecklistTableProps = {
  domain: DomainBlock;
};

export function ChecklistTable({ domain }: ChecklistTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-slate-900">{domain.domain}</h3>
        <StatusBadge status={domain.status} />
      </div>
      <div className="space-y-3">
        {domain.checklist.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{item.rule}</p>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-200 px-2 py-1 text-slate-800">Owner: {item.owner}</span>
              <span className="rounded-full bg-slate-200 px-2 py-1 text-slate-800">Priority: {item.priority}</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">Evidence: {item.evidence}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
