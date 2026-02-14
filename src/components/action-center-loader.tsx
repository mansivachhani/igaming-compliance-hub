"use client";

import dynamic from "next/dynamic";

const ActionCenterNoSSR = dynamic(
  () => import("@/components/action-center").then((module) => module.ActionCenter),
  { ssr: false },
);

export function ActionCenterLoader() {
  return <ActionCenterNoSSR />;
}
