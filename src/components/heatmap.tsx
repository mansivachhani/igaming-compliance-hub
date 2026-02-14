import {
  countries,
  controlDomains,
  Status,
} from "@/lib/regulation-data";

const dotClass: Record<Status, string> = {
  Compliant: "bg-emerald-500",
  "At Risk": "bg-amber-500",
  "Action Needed": "bg-rose-500",
};

export function Heatmap() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold text-slate-900">Control Heatmap</h2>
      <p className="mt-1 text-sm text-slate-600">
        Fast view of each country by control domain.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="pr-4">Control Domain</th>
              {countries.map((country) => (
                <th key={country.slug} className="px-3">
                  {country.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {controlDomains.map((domain) => (
              <tr key={domain} className="rounded-lg bg-slate-50">
                <td className="rounded-l-lg px-3 py-2 font-medium text-slate-800">{domain}</td>
                {countries.map((country) => {
                  const status = country.domains.find((d) => d.domain === domain)?.status;

                  if (!status) {
                    return <td key={`${country.slug}-${domain}`} className="px-3 py-2 text-slate-400">N/A</td>;
                  }

                  return (
                    <td key={`${country.slug}-${domain}`} className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${dotClass[status]}`}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-slate-700">{status}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
