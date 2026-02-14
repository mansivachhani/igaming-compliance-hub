import { Status } from "@/lib/regulation-data";

const statusClasses: Record<Status, string> = {
  Compliant: "bg-emerald-100 text-emerald-800 border-emerald-300",
  "At Risk": "bg-amber-100 text-amber-800 border-amber-300",
  "Action Needed": "bg-rose-100 text-rose-800 border-rose-300",
};

type StatusBadgeProps = {
  status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}
