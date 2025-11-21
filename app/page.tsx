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
import { ThemeSwitch } from "@/components/theme-switch";

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
      countdown.title,
    )}&date=${encodeURIComponent(countdown.targetDate)}&theme=${
      countdown.theme
    }`;
    const iframeCode = `<iframe src="${url}" width="293" height="50" style="border:none; overflow:hidden; border-radius:9999px; background:transparent;" scrolling="no" allowtransparency="true"></iframe>`;

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
      <main className="container mx-auto max-w-7xl px-6 pt-16">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="absolute top-4 right-4">
            <ThemeSwitch />
          </div>
          <div className="inline-block max-w-xl text-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Countdown Generator</h1>
            <p className="text-lg text-default-600 mb-8">
              Create horizontal countdown widgets for your website.
            </p>
            <Button color="primary" onPress={handleCreate}>
              Create New Countdown
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
                    targetDate={countdown.targetDate}
                    theme={countdown.theme}
                    title={countdown.title}
                  />
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(countdown)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    onPress={() => deleteCountdown(countdown.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    variant="flat"
                    onPress={() => handleExport(countdown)}
                  >
                    Export
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
                      ? "Export Code"
                      : editingCountdown
                        ? "Edit Countdown"
                        : "New Countdown"}
                  </ModalHeader>
                  <ModalBody>
                    {exportCode ? (
                      <div className="flex flex-col gap-4">
                        <p>
                          Copy this code to embed the countdown on your site:
                        </p>
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
