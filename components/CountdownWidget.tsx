"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@heroui/theme";

interface CountdownWidgetProps {
  targetDate: string;
  title: string;
  theme?: "light" | "dark" | "colorful" | "custom";
  backgroundColor?: string;
  textColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({
  targetDate,
  title,
  theme = "light",
  backgroundColor,
  textColor,
  gradientFrom,
  gradientTo,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Shared gradient defaults to keep Colorful and Custom consistent
  const defaultFrom = "#b14bf4";
  const defaultMid = "#c43ddf";
  const defaultTo = "#f43f8f";

  const isCustomGradient =
    theme === "custom" && Boolean(gradientFrom || gradientTo);
  const isDefaultGradient =
    theme === "colorful" ||
    (theme === "custom" && !backgroundColor && !isCustomGradient);

  const fromColor = gradientFrom || defaultFrom;
  const toColor = gradientTo || defaultTo;
  const midColor = gradientFrom && gradientTo ? undefined : defaultMid; // keep mid stop when not fully custom

  const gradientBackground = isCustomGradient
    ? midColor
      ? `linear-gradient(90deg, ${fromColor} 0%, ${midColor} 50%, ${toColor} 100%)`
      : `linear-gradient(90deg, ${fromColor} 0%, ${toColor} 100%)`
    : isDefaultGradient
      ? `linear-gradient(90deg, ${defaultFrom} 0%, ${defaultMid} 50%, ${defaultTo} 100%)`
      : undefined;

  const customStyle = {
    backgroundImage: gradientBackground,
    backgroundColor:
      !isCustomGradient && !isDefaultGradient
        ? backgroundColor || undefined
        : undefined,
    color: textColor || undefined,
    border: backgroundColor || isCustomGradient || isDefaultGradient ? "none" : undefined,
  } satisfies React.CSSProperties;

  const themeClasses = cn(
    "w-[293px] h-[50px] flex flex-row items-center justify-between px-4 overflow-hidden rounded-xl transition-all",
    theme === "light" && "bg-white text-black border border-gray-200 shadow-lg",
    theme === "dark" && "bg-black text-white border border-gray-800 shadow-lg",
    isDefaultGradient && "text-white shadow-lg",
    isCustomGradient && "text-white shadow-lg",
    theme === "custom" &&
      !isDefaultGradient &&
      !isCustomGradient &&
      "bg-white border border-gray-200 shadow-lg",
    !textColor && (isDefaultGradient || isCustomGradient) && "text-white",
  );

  return (
    <div className={themeClasses} style={customStyle}>
      <div className="text-xs font-bold tracking-widest uppercase opacity-80 truncate max-w-[80px]">
        {title}
      </div>

      <div className="flex gap-2 items-center justify-center flex-1">
        <TimeUnit label="天" value={timeLeft.days} />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit label="時" value={timeLeft.hours} />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit label="分" value={timeLeft.minutes} />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit label="秒" value={timeLeft.seconds} />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center justify-center min-w-[24px]">
    <span className="text-sm font-bold leading-none">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-[8px] opacity-60 leading-none">{label}</span>
  </div>
);
