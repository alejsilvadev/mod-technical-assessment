"use client";

import dynamic from "next/dynamic";

const WireframeSphere = dynamic(
  () => import("@/components/wireframe-sphere").then((mod) => mod.WireframeSphere),
  {
    ssr: false,
    loading: () => <div className="h-[100vh] bg-stone-900" />,
  }
);

export function WireframeSphereLoader() {
  return <WireframeSphere />;
}
