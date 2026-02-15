"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "~/lib/gsap";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="combobox"], [role="option"], [role="menuitem"], [role="tab"], input, textarea, select, [data-slot="select-trigger"], [data-slot="select-item"], .magnetic-target, [href], label[for], summary';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const activeTargets = useRef(new Set<Element>());

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, {
      scale: 3,
      backgroundColor: "#FFD948",
      mixBlendMode: "difference",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: "white",
      mixBlendMode: "difference",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const bindTarget = useCallback(
    (el: Element) => {
      if (activeTargets.current.has(el)) return;
      activeTargets.current.add(el);
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    },
    [handleMouseEnter, handleMouseLeave],
  );

  const unbindTarget = useCallback(
    (el: Element) => {
      if (!activeTargets.current.has(el)) return;
      activeTargets.current.delete(el);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    },
    [handleMouseEnter, handleMouseLeave],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !cursorRef.current) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Bind all current interactive elements
    document.querySelectorAll(INTERACTIVE_SELECTOR).forEach(bindTarget);

    // Observe DOM changes to bind new interactive elements dynamically
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            if (node.matches(INTERACTIVE_SELECTOR)) bindTarget(node);
            node.querySelectorAll(INTERACTIVE_SELECTOR).forEach(bindTarget);
          }
        }
        for (const node of mutation.removedNodes) {
          if (node instanceof Element) {
            if (activeTargets.current.has(node)) unbindTarget(node);
            node.querySelectorAll(INTERACTIVE_SELECTOR).forEach(unbindTarget);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      for (const el of activeTargets.current) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      activeTargets.current.clear();
    };
  }, [bindTarget, unbindTarget, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "white",
        pointerEvents: "none",
        zIndex: 10000,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
      aria-hidden="true"
    />
  );
}

export default CustomCursor;
