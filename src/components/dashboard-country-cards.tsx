"use client";

import { useEffect, useMemo, useState } from "react";
import { CountryCard } from "@/components/country-card";
import { countries } from "@/lib/regulation-data";
import {
  ACTION_CENTER_STORAGE_KEY,
  getCountryProgress,
  PersistedState,
  readPersistedState,
} from "@/lib/action-center-state";

export function DashboardCountryCards() {
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

  const progressMap = useMemo(() => {
    return new Map(countries.map((country) => [country.slug, getCountryProgress(country.slug, stateMap)]));
  }, [stateMap]);

  return (
    <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard
          key={country.slug}
          country={country}
          progress={progressMap.get(country.slug)}
        />
      ))}
    </section>
  );
}
