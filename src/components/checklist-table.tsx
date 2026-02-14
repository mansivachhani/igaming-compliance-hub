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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-2 pr-3">Rule</th>
              <th className="pb-2 pr-3">Owner</th>
              <th className="pb-2 pr-3">Priority</th>
              <th className="pb-2 pr-3">Status</th>
              <th className="pb-2">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {domain.checklist.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 align-top">
                <td className="py-3 pr-3 text-slate-800">{item.rule}</td>
                <td className="py-3 pr-3 text-slate-700">{item.owner}</td>
                <td className="py-3 pr-3 text-slate-700">{item.priority}</td>
                <td className="py-3 pr-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 text-slate-700">{item.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
