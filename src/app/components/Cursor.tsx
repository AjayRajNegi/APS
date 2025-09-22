"use client";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import type { SpringOptions, Transition, Variant } from "framer-motion";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  targetRef?: React.RefObject<HTMLElement | null>;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  targetRef,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!(attachToParent || !!targetRef));

  useEffect(() => {
    if (typeof window !== "undefined") {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [cursorX, cursorY, onPositionChange]);

  // visibility attachment: use provided targetRef, fallback to parent if attachToParent
  useEffect(() => {
    const target =
      (targetRef && targetRef.current) ||
      (attachToParent ? (cursorRef.current?.parentElement ?? null) : null);

    if (!target) return;

    // stable handlers so we can remove them correctly later
    const onEnter = () => {
      // hide default cursor inside the target and show custom cursor
      try {
        (target as HTMLElement).style.cursor = "none";
      } catch {}
      setIsVisible(true);
    };
    const onLeave = () => {
      try {
        (target as HTMLElement).style.cursor = "auto";
      } catch {}
      setIsVisible(false);
    };

    target.addEventListener("pointerenter", onEnter);
    target.addEventListener("pointerleave", onLeave);

    // Also set initial visibility if pointer is already inside (optional)
    // (use getBoundingClientRect check if you need initial state on mount)

    return () => {
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointerleave", onLeave);
      try {
        (target as HTMLElement).style.cursor = "auto";
      } catch {}
    };
  }, [targetRef, attachToParent]);

  const cursorXSpring = useSpring(
    cursorX,
    springConfig ?? { stiffness: 500, damping: 40 },
  );
  const cursorYSpring = useSpring(
    cursorY,
    springConfig ?? { stiffness: 500, damping: 40 },
  );

  const cursorNode = (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed top-0 left-0 z-50", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (typeof document === "undefined") return cursorNode;
  return createPortal(cursorNode, document.body);
}
