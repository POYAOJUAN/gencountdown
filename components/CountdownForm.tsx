"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";

import { Countdown } from "@/hooks/useCountdowns";

interface CountdownFormProps {
  initialData?: Partial<Countdown>;
  onSubmit: (data: Omit<Countdown, "id">) => void;
  onCancel: () => void;
}

export const CountdownForm: React.FC<CountdownFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [targetDate, setTargetDate] = useState(() => {
    if (initialData?.targetDate) return initialData.targetDate;
    const date = new Date();

    date.setDate(date.getDate() + 1); // Default to tomorrow
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Adjust to local timezone

    return date.toISOString().slice(0, 16);
  });
  const [theme, setTheme] = useState<Countdown["theme"]>(
    initialData?.theme || "light",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      targetDate,
      theme,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Title"
        placeholder="Enter countdown title"
        value={title}
        onValueChange={setTitle}
      />
      <Input
        isRequired
        label="Target Date"
        type="datetime-local"
        value={targetDate}
        onValueChange={setTargetDate}
      />
      <Select
        label="Theme"
        selectedKeys={[theme]}
        onChange={(e) => setTheme(e.target.value as Countdown["theme"])}
      >
        <SelectItem key="light">Light</SelectItem>
        <SelectItem key="dark">Dark</SelectItem>
        <SelectItem key="colorful">Colorful</SelectItem>
      </Select>
      <div className="flex gap-2 justify-end mt-4">
        <Button color="danger" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
