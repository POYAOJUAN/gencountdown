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
    <div className="w-[293px] h-[50px] overflow-hidden">
      <CountdownWidget targetDate={targetDate} theme={theme} title={title} />
    </div>
  );
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedContent />
    </Suspense>
  );
}
