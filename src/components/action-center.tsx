"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { countries, domainAnchor, flattenRows } from "@/lib/regulation-data";
import {
  AuditEvent,
  ownerOptions,
  PersistedState,
  readPersistedState,
  savePersistedState,
  withDefaultState,
} from "@/lib/action-center-state";
import { StatusBadge } from "@/components/status-badge";

type CountryFilter = "all" | (typeof countries)[number]["slug"];

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function ActionCenter() {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>("all");
  const [criticalOnly, setCriticalOnly] = useState(true);
  const [statusMode, setStatusMode] = useState<"gaps" | "all">("gaps");
  const [stateMap, setStateMap] = useState<PersistedState>(readPersistedState);

  const allRows = useMemo(() => flattenRows(), []);
  const countryOptions = useMemo(
    () =>
      allRows.reduce<Array<{ slug: string; name: string }>>((acc, row) => {
        if (!acc.find((country) => country.slug === row.countrySlug)) {
          acc.push({ slug: row.countrySlug, name: row.countryName });
        }
        return acc;
      }, []),
    [allRows],
  );

  useEffect(() => {
    savePersistedState(stateMap);
  }, [stateMap]);

  const rows = useMemo(() => {
    return allRows.filter((row) => {
      if (countryFilter !== "all" && row.countrySlug !== countryFilter) {
        return false;
      }

      if (criticalOnly && row.priority !== "Critical") {
        return false;
      }

      if (statusMode === "gaps") {
        return row.status === "Action Needed" || row.status === "At Risk";
      }

      return true;
    });
  }, [allRows, countryFilter, criticalOnly, statusMode]);

  const completedCount = rows.filter((row) => withDefaultState(stateMap, row).completed).length;
  const openCountry = countryFilter === "all" ? countryOptions[0]?.slug ?? "uk" : countryFilter;

  function patchItem(
    rowId: string,
    patch: Partial<ReturnType<typeof withDefaultState>>,
    action: string,
    details: string,
  ) {
    const row = allRows.find((entry) => entry.id === rowId);

    if (!row) {
      return;
    }

    setStateMap((current) => {
      const previous = withDefaultState(current, row);
      const auditEvent: AuditEvent = {
        timestamp: new Date().toISOString(),
        action,
        details,
      };

      return {
        ...current,
        [row.id]: {
          ...previous,
          ...patch,
          auditTrail: [auditEvent, ...previous.auditTrail].slice(0, 20),
        },
      };
    });
  }

  function exportCsv() {
    const header = [
      "id",
      "country",
      "domain",
      "rule",
      "priority",
      "status",
      "assigned_owner",
      "due_date",
      "completed",
      "completed_at",
      "evidence",
    ];

    const lines = rows.map((row) => {
      const item = withDefaultState(stateMap, row);

      return [
        row.id,
        row.countryName,
        row.domain,
        row.rule,
        row.priority,
        row.status,
        item.assignedOwner,
        item.dueDate,
        item.completed ? "yes" : "no",
        item.completedAt,
        row.evidence,
      ]
        .map((cell) => csvEscape(String(cell)))
        .join(",");
    });

    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `igaming-actions-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Action Center</h2>
          <p className="mt-1 text-sm text-slate-600">Assign owners, set due dates, close items, and export filtered actions.</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800"
        >
          Export CSV
        </button>
      </div>

      <div className="mt-4 grid gap-3 text-sm lg:grid-cols-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-500">Step 1: Choose Country</p>
          <select
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value as CountryFilter)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"
          >
            <option value="all">All countries</option>
            {countryOptions.map((country) => (
              <option key={country.slug} value={country.slug}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-500">Step 2: Filter Severity</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStatusMode("gaps")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusMode === "gaps" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              Gaps only
            </button>
            <button
              type="button"
              onClick={() => setStatusMode("all")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                statusMode === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              All controls
            </button>
            <button
              type="button"
              onClick={() => setCriticalOnly((value) => !value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                criticalOnly ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {criticalOnly ? "Critical only" : "Critical + High"}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-500">Step 3: Open Rulebook Section</p>
          <Link
            href={`/country/${openCountry}`}
            className="mt-1 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Open selected country
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-900 p-3 text-white">
        <p className="text-xs tracking-wide text-slate-300">Progress</p>
        <p className="mt-1 text-sm font-semibold">
          {completedCount}/{rows.length} completed in current filtered view
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold tracking-wide text-slate-600">Actionable Checklist ({rows.length})</p>
        <div className="mt-2 max-h-[42rem] space-y-2 overflow-auto pr-1">
          {rows.length === 0 ? (
            <p className="text-xs text-slate-500">No items match the selected filters.</p>
          ) : (
            rows.map((row) => {
              const itemState = withDefaultState(stateMap, row);

              return (
                <article key={row.id} className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-900">{row.countryName}</p>
                    <StatusBadge status={row.status} />
                  </div>

                  <p className="mt-1 text-xs text-slate-800">{row.rule}</p>
                  <p className="mt-1 text-[11px] text-slate-600">Priority: {row.priority} | Evidence: {row.evidence}</p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <label className="text-[11px] text-slate-600">
                      Assigned owner
                      <select
                        value={itemState.assignedOwner}
                        onChange={(event) =>
                          patchItem(row.id, { assignedOwner: event.target.value as (typeof ownerOptions)[number] }, "ASSIGN_OWNER", `Owner set to ${event.target.value}`)
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900"
                      >
                        {ownerOptions.map((owner) => (
                          <option key={owner} value={owner}>
                            {owner}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-[11px] text-slate-600">
                      Due date
                      <input
                        type="date"
                        value={itemState.dueDate}
                        onChange={(event) =>
                          patchItem(
                            row.id,
                            { dueDate: event.target.value },
                            "SET_DUE_DATE",
                            event.target.value ? `Due date set to ${event.target.value}` : "Due date cleared",
                          )
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900"
                      />
                    </label>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (itemState.completed) {
                          patchItem(row.id, { completed: false, completedAt: "" }, "MARK_OPEN", "Control marked as open");
                          return;
                        }

                        const completedAt = new Date().toISOString();
                        patchItem(row.id, { completed: true, completedAt }, "MARK_COMPLETE", `Control completed at ${completedAt}`);
                      }}
                      className={`rounded-md px-3 py-1 text-xs font-semibold ${
                        itemState.completed
                          ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                          : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                      }`}
                    >
                      {itemState.completed ? "Mark open" : "Mark complete"}
                    </button>

                    {itemState.completedAt ? (
                      <p className="text-[11px] text-emerald-700">
                        Completed: {new Date(itemState.completedAt).toLocaleString()}
                      </p>
                    ) : null}

                    <Link
                      href={`/country/${row.countrySlug}#${domainAnchor(row.domain)}`}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-900"
                    >
                      Open section: {row.domain}
                    </Link>
                  </div>

                  <details className="mt-3 rounded-md bg-slate-50 p-2">
                    <summary className="cursor-pointer text-[11px] font-semibold text-slate-700">
                      Audit trail ({itemState.auditTrail.length})
                    </summary>
                    <div className="mt-2 space-y-1">
                      {itemState.auditTrail.length === 0 ? (
                        <p className="text-[11px] text-slate-500">No actions yet.</p>
                      ) : (
                        itemState.auditTrail.map((event, index) => (
                          <p key={`${row.id}-${event.timestamp}-${index}`} className="text-[11px] text-slate-600">
                            {new Date(event.timestamp).toLocaleString()} | {event.action} | {event.details}
                          </p>
                        ))
                      )}
                    </div>
                  </details>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
