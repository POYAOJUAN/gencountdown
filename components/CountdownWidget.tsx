"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@heroui/theme";

interface CountdownWidgetProps {
  targetDate: string;
  title: string;
  theme?: "light" | "dark" | "colorful";
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({
  targetDate,
  title,
  theme = "light",
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

  const themeStyles = {
    light: "bg-white text-black border-gray-200",
    dark: "bg-black text-white border-gray-800",
    colorful: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent",
  };

  return (
    <div
      className={cn(
        "w-[293px] h-[50px] flex flex-row items-center justify-between px-4 overflow-hidden rounded-xl border shadow-sm transition-all",
        themeStyles[theme]
      )}
    >
      <div className="text-xs font-bold tracking-widest uppercase opacity-80 truncate max-w-[80px]">
        {title}
      </div>

      <div className="flex gap-2 items-center justify-center flex-1">
        <TimeUnit value={timeLeft.days} label="天" />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit value={timeLeft.hours} label="時" />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit value={timeLeft.minutes} label="分" />
        <span className="text-xs font-bold opacity-40">:</span>
        <TimeUnit value={timeLeft.seconds} label="秒" />
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
