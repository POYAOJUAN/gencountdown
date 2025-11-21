"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";

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
  const [widgetTitle, setWidgetTitle] = useState(
    initialData?.widgetTitle || initialData?.title || "",
  );
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
  const [backgroundColor, setBackgroundColor] = useState(
    initialData?.backgroundColor || "",
  );
  const [textColor, setTextColor] = useState(initialData?.textColor || "");
  const [useCustomBackground, setUseCustomBackground] = useState(
    Boolean(initialData?.backgroundColor),
  );
  const [useCustomTextColor, setUseCustomTextColor] = useState(
    Boolean(initialData?.textColor),
  );
  const [gradientFrom, setGradientFrom] = useState(
    initialData?.gradientFrom || "#a855f7",
  );
  const [gradientTo, setGradientTo] = useState(
    initialData?.gradientTo || "#ec4899",
  );
  const [useCustomGradient, setUseCustomGradient] = useState(
    Boolean(initialData?.gradientFrom || initialData?.gradientTo),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCustomTheme = theme === "custom";
    const cleanBackground =
      isCustomTheme && useCustomBackground ? backgroundColor.trim() : "";
    const cleanText =
      isCustomTheme && useCustomTextColor ? textColor.trim() : "";
    onSubmit({
      title,
      widgetTitle: widgetTitle.trim() || title.trim(),
      targetDate,
      theme,
      backgroundColor: cleanBackground || undefined,
      textColor: cleanText || undefined,
      gradientFrom: isCustomTheme && useCustomGradient && gradientFrom ? gradientFrom : undefined,
      gradientTo: isCustomTheme && useCustomGradient && gradientTo ? gradientTo : undefined,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="卡片標題"
        placeholder="顯示在卡片左上"
        value={title}
        onValueChange={setTitle}
      />
      <Input
        label="倒數內部標題"
        placeholder="顯示在倒數膠囊內"
        value={widgetTitle}
        onValueChange={setWidgetTitle}
      />
      <Input
        isRequired
        label="目標時間"
        type="datetime-local"
        value={targetDate}
        onValueChange={setTargetDate}
      />
      <Select
        label="主題"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          const value = Array.from(keys).pop() as Countdown["theme"] | undefined;
          if (value) setTheme(value);
        }}
      >
        <SelectItem key="light">亮色</SelectItem>
        <SelectItem key="dark">暗色</SelectItem>
        <SelectItem key="colorful">漸層</SelectItem>
        <SelectItem key="custom">自訂</SelectItem>
      </Select>
      {theme === "custom" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 rounded-lg border border-default-200/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">自訂背景顏色</span>
                <Switch
                  isSelected={useCustomBackground}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUseCustomBackground(checked);
                    if (checked) {
                      // background takes precedence over gradient
                      setUseCustomGradient(false);
                      if (!backgroundColor) setBackgroundColor("#ffffff");
                    }
                    if (!checked) setBackgroundColor("");
                  }}
                  size="sm"
                />
              </div>
              <Input
                label="背景色"
                type="color"
                isDisabled={!useCustomBackground}
                value={
                  useCustomBackground ? backgroundColor || "#ffffff" : "#ffffff"
                }
                onValueChange={(val) => setBackgroundColor(val || "")}
              />
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-default-200/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">自訂文字顏色</span>
                <Switch
                  isSelected={useCustomTextColor}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUseCustomTextColor(checked);
                    if (checked && !textColor) setTextColor("#000000");
                    if (!checked) setTextColor("");
                  }}
                  size="sm"
                />
              </div>
              <Input
                label="文字色"
                type="color"
                isDisabled={!useCustomTextColor}
                value={useCustomTextColor ? textColor || "#000000" : "#000000"}
                onValueChange={(val) => setTextColor(val || "")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-default-200/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">啟用漸層</span>
              <Switch
                isSelected={useCustomGradient}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setUseCustomGradient(checked);
                  if (checked) {
                    // gradient takes precedence over flat background
                    setUseCustomBackground(false);
                    if (!gradientFrom) setGradientFrom("#a855f7");
                    if (!gradientTo) setGradientTo("#ec4899");
                  } else {
                    // when turning off, clear custom stops to fall back to defaults
                    setGradientFrom("");
                    setGradientTo("");
                  }
                }}
                size="sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                isDisabled={!useCustomGradient}
                label="漸層起點"
                type="color"
                value={gradientFrom}
                onValueChange={setGradientFrom}
              />
              <Input
                isDisabled={!useCustomGradient}
                label="漸層終點"
                type="color"
                value={gradientTo}
                onValueChange={setGradientTo}
              />
            </div>
          </div>
        </>
      ) : null}
      {theme === "colorful" ? (
        <div className="flex flex-col gap-2 rounded-lg border border-default-200/50 p-3">
          <p className="text-sm text-default-600">
            漸層主題使用內建配色，若要自訂請切換到「自訂」。
          </p>
        </div>
      ) : null}
      <div className="flex gap-2 justify-end mt-4">
        <Button color="danger" variant="light" onPress={onCancel}>
          取消
        </Button>
        <Button color="primary" type="submit">
          儲存
        </Button>
      </div>
    </form>
  );
};
