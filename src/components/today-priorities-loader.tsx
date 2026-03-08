"use client";

import dynamic from "next/dynamic";

const TodayPrioritiesNoSSR = dynamic(
  () => import("@/components/today-priorities").then((module) => module.TodayPriorities),
  { ssr: false },
);

export function TodayPrioritiesLoader() {
  return <TodayPrioritiesNoSSR />;
}
