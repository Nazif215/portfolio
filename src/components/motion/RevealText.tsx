"use client";

import { createElement } from "react";
import { motion, Variants } from "framer-motion";

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.09,
    },
  }),
};

export function RevealText({
  lines,
  as: Tag = "h1",
  className,
  start = "visible",
  baseDelay = 0,
}: {
  lines: string[];
  as?: React.ElementType;
  className?: string;
  start?: "visible" | "hidden";
  baseDelay?: number;
}) {
  return createElement(
    Tag,
    { className },
    lines.map((line, i) => (
      <span key={line} className="block overflow-hidden">
        <motion.span
          className="block will-change-transform"
          custom={i}
          variants={lineVariants}
          initial="hidden"
          animate={start}
          transition={{ delay: baseDelay + i * 0.09 }}
        >
          {line}
        </motion.span>
      </span>
    ))
  );
}
