"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { CountdownWidget } from "@/components/CountdownWidget";

function EmbedContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Countdown";
  const targetDate = searchParams.get("date") || new Date().toISOString();
  const theme =
    (searchParams.get("theme") as "light" | "dark" | "colorful") || "light";

  return (
    <CountdownWidget targetDate={targetDate} theme={theme} title={title} />
  );
}

export default function EmbedPage() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[50px] bg-transparent">
      <Suspense
        fallback={<div className="text-xs text-default-500">Loading...</div>}
      >
        <EmbedContent />
      </Suspense>
    </div>
  );
}
