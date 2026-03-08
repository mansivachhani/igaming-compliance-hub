"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { domainAnchor } from "@/lib/regulation-data";
import {
  ACTION_CENTER_STORAGE_KEY,
  getTodayPriorities,
  PersistedState,
  readPersistedState,
} from "@/lib/action-center-state";

export function TodayPriorities() {
  const [stateMap, setStateMap] = useState<PersistedState>(readPersistedState);

  useEffect(() => {
    function syncFromStorage(event: StorageEvent) {
      if (event.key && event.key !== ACTION_CENTER_STORAGE_KEY) {
        return;
      }

      setStateMap(readPersistedState());
    }

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const priorities = useMemo(() => getTodayPriorities(stateMap, 6), [stateMap]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Today&apos;s Priorities</h2>
          <p className="mt-1 text-sm text-slate-600">Top controls to resolve first based on urgency score.</p>
        </div>
        <Link
          href="/action-center"
          className="rounded-lg bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800"
        >
          Manage in Action Center
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {priorities.length === 0 ? (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">No open priorities. All tracked controls are complete.</p>
        ) : (
          priorities.map((item) => (
            <article key={item.row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{item.row.countryName}</p>
                <p className="text-xs font-semibold text-rose-700">Urgency: {item.score}</p>
              </div>
              <p className="mt-1 text-sm text-slate-800">{item.row.rule}</p>
              <p className="mt-1 text-xs text-slate-600">Owner: {item.state.assignedOwner} | Due: {item.state.dueDate || "Not set"}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.reasons.map((reason) => (
                  <span key={`${item.row.id}-${reason}`} className="rounded-full bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-800">
                    {reason}
                  </span>
                ))}
              </div>
              <Link
                href={`/country/${item.row.countrySlug}#${domainAnchor(item.row.domain)}`}
                className="mt-2 inline-flex text-xs font-semibold text-sky-700 hover:text-sky-900"
              >
                Open {item.row.countryName} section
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
