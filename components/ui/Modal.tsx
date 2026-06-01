"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Accessible description; visually rendered by caller if omitted. */
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Accessible, keyboard-navigable modal (focus trap + Esc to close via Radix). */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={description ? undefined : undefined}
          className={cn(
            "dialog-content panel fixed left-1/2 top-1/2 z-[100] w-[min(94vw,46rem)] max-h-[88vh] overflow-y-auto rounded-2xl p-6 shadow-2xl sm:p-7",
            className,
          )}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {description ? (
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>
          ) : null}
          <Dialog.Close
            aria-label="Close dialog"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-muted transition-colors hover:border-neon/50 hover:text-neon"
          >
            <X className="h-4 w-4" aria-hidden />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
