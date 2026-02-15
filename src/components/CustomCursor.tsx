"use client";

import { useEffect, useRef } from "react";
import { gsap } from "~/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !cursorRef.current) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const magneticTargets = document.querySelectorAll(".magnetic-target");

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "#FFD948",
        mixBlendMode: "difference",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "white",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    magneticTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      magneticTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

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
