"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";

export type LightboxState = { images: string[]; index: number } | null;

export function Lightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: LightboxState;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { images, index } = state ?? { images: [], index: 0 };
  const open = state !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onClose, onNavigate]);

  const src = open ? images[index] : null;

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/96 backdrop-blur-sm"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            data-cursor="close"
            data-cursor-label="Close"
            className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/80 backdrop-blur-sm"
            aria-label="Close image"
          >
            <X className="h-5 w-5 text-paper" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index - 1 + images.length) % images.length);
                }}
                data-cursor="link"
                className="fixed left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/80 backdrop-blur-sm sm:left-8"
                aria-label="Previous image"
              >
                <CaretLeft className="h-5 w-5 text-paper" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index + 1) % images.length);
                }}
                data-cursor="link"
                className="fixed right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/80 backdrop-blur-sm sm:right-8"
                aria-label="Next image"
              >
                <CaretRight className="h-5 w-5 text-paper" />
              </button>
            </>
          )}

          <motion.div
            key={src}
            className="relative h-[82vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={src} alt="" fill sizes="90vw" className="object-contain" priority />
          </motion.div>

          {images.length > 1 && (
            <span className="fixed bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-mist">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
