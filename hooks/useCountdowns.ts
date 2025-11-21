import { useState, useEffect } from "react";

export interface Countdown {
  id: string;
  title: string;
  targetDate: string; // ISO string
  theme: "light" | "dark" | "colorful";
}

const STORAGE_KEY = "gen_countdowns";

export function useCountdowns() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setCountdowns(JSON.parse(saved));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse countdowns", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveCountdowns = (newCountdowns: Countdown[]) => {
    setCountdowns(newCountdowns);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCountdowns));
  };

  const addCountdown = (countdown: Omit<Countdown, "id">) => {
    const newCountdown = { ...countdown, id: crypto.randomUUID() };

    saveCountdowns([...countdowns, newCountdown]);
  };

  const updateCountdown = (id: string, updates: Partial<Countdown>) => {
    const newCountdowns = countdowns.map((c) =>
      c.id === id ? { ...c, ...updates } : c,
    );

    saveCountdowns(newCountdowns);
  };

  const deleteCountdown = (id: string) => {
    const newCountdowns = countdowns.filter((c) => c.id !== id);

    saveCountdowns(newCountdowns);
  };

  return {
    countdowns,
    isLoaded,
    addCountdown,
    updateCountdown,
    deleteCountdown,
  };
}
