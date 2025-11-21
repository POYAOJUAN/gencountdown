"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Snippet } from "@heroui/snippet";

import { useCountdowns, Countdown } from "@/hooks/useCountdowns";
import { CountdownForm } from "@/components/CountdownForm";
import { CountdownWidget } from "@/components/CountdownWidget";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const {
    countdowns,
    isLoaded,
    addCountdown,
    updateCountdown,
    deleteCountdown,
  } = useCountdowns();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingCountdown, setEditingCountdown] = useState<Countdown | null>(
    null,
  );
  const [exportCode, setExportCode] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingCountdown(null);
    setExportCode(null);
    onOpen();
  };

  const handleEdit = (countdown: Countdown) => {
    setEditingCountdown(countdown);
    setExportCode(null);
    onOpen();
  };

  const handleExport = (countdown: Countdown) => {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const url = `${appUrl}/embed?title=${encodeURIComponent(
      countdown.widgetTitle || countdown.title,
    )}&date=${encodeURIComponent(countdown.targetDate)}&theme=${
      countdown.theme
    }${
      countdown.backgroundColor
        ? `&bg=${encodeURIComponent(countdown.backgroundColor)}`
        : ""
    }${
      countdown.textColor
        ? `&text=${encodeURIComponent(countdown.textColor)}`
        : ""
    }${
      countdown.gradientFrom
        ? `&gFrom=${encodeURIComponent(countdown.gradientFrom)}`
        : ""
    }${
      countdown.gradientTo
        ? `&gTo=${encodeURIComponent(countdown.gradientTo)}`
        : ""
    }`;
    const iframeCode = `<iframe src="${url}" width="293" height="50" style="border:none; overflow:hidden; border-radius:12px; background:transparent;" scrolling="no" allowtransparency="true"></iframe>`;

    setExportCode(iframeCode);
    setEditingCountdown(null); // Clear editing state if any
    onOpen(); // Reuse modal for export
  };

  const handleSubmit = (data: Omit<Countdown, "id">) => {
    if (editingCountdown) {
      updateCountdown(editingCountdown.id, data);
    } else {
      addCountdown(data);
    }
    onOpenChange();
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 pt-16">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-center justify-center">
            <h1 className="text-4xl font-bold mb-4">倒數計時產生器</h1>
            <p className="text-lg text-default-600 mb-8 space-y-2">
              <br />
              <span>一鍵複製，立即嵌入 Teachify 方案簡介。</span>
              <br />
              <span>
                設定完成後可即時刪除資料，不影響已嵌入 Teachify 的呈現。
              </span>
            </p>
            <Button color="primary" onPress={handleCreate}>
              建立新的倒數
            </Button>
          </div>

          <div className="flex flex-col gap-6 mt-8 w-full max-w-4xl px-4">
            {countdowns.map((countdown) => (
              <Card key={countdown.id} className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {countdown.title}
                  </p>
                  <small className="text-default-500">
                    {new Date(countdown.targetDate).toLocaleDateString()}
                  </small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex items-center justify-center">
                  <CountdownWidget
                    backgroundColor={countdown.backgroundColor}
                    gradientFrom={countdown.gradientFrom}
                    gradientTo={countdown.gradientTo}
                    targetDate={countdown.targetDate}
                    textColor={countdown.textColor}
                    theme={countdown.theme}
                    title={countdown.widgetTitle || countdown.title}
                  />
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(countdown)}
                  >
                    編輯
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => deleteCountdown(countdown.id)}
                  >
                    刪除
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    variant="flat"
                    onPress={() => handleExport(countdown)}
                  >
                    匯出
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {exportCode
                      ? "匯出嵌入碼"
                      : editingCountdown
                        ? "編輯倒數"
                        : "新增倒數"}
                  </ModalHeader>
                  <ModalBody className="max-h-[70vh] overflow-y-auto">
                    {exportCode ? (
                      <div className="flex flex-col gap-4">
                        <p>複製這段程式碼嵌入你的網站：</p>
                        <Snippet
                          className="w-full"
                          classNames={{
                            pre: "whitespace-pre-wrap break-all font-mono text-xs",
                          }}
                          symbol=""
                          variant="bordered"
                        >
                          {exportCode}
                        </Snippet>
                      </div>
                    ) : (
                      <CountdownForm
                        initialData={editingCountdown || undefined}
                        onCancel={onClose}
                        onSubmit={handleSubmit}
                      />
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>
      </main>
    </div>
  );
}
