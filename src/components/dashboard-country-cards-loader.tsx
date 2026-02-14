"use client";

import dynamic from "next/dynamic";

const DashboardCountryCardsNoSSR = dynamic(
  () => import("@/components/dashboard-country-cards").then((module) => module.DashboardCountryCards),
  { ssr: false },
);

export function DashboardCountryCardsLoader() {
  return <DashboardCountryCardsNoSSR />;
}
