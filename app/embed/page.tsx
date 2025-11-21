"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { CountdownWidget } from "@/components/CountdownWidget";

function EmbedContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "倒數計時";
  const targetDate = searchParams.get("date") || new Date().toISOString();
  const theme =
    (searchParams.get("theme") as "light" | "dark" | "colorful" | "custom") ||
    "light";
  const backgroundColor = searchParams.get("bg") || undefined;
  const textColor = searchParams.get("text") || undefined;
  const gradientFrom = searchParams.get("gFrom") || undefined;
  const gradientTo = searchParams.get("gTo") || undefined;

  return (
    <CountdownWidget
      backgroundColor={backgroundColor}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
      targetDate={targetDate}
      textColor={textColor}
      theme={theme}
      title={title}
    />
  );
}

export default function EmbedPage() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[50px] bg-white dark:bg-white">
      <Suspense
        fallback={<div className="text-xs text-default-500">Loading...</div>}
      >
        <EmbedContent />
      </Suspense>
    </div>
  );
}
