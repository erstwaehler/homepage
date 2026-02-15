import type { ITransitionData } from "@barba/core";
import { cleanupScrollTrigger, gsap, initScrollTrigger } from "./gsap";

export async function initBarba() {
  if (typeof window === "undefined") return;

  // Dynamic import to avoid SSR issues (Element is not defined in Node.js)
  const { default: barba } = await import("@barba/core");

  barba.init({
    transitions: [
      {
        name: "page-transition",
        leave(data: ITransitionData) {
          cleanupScrollTrigger();

          return new Promise((resolve) => {
            gsap.to(data.current.container, {
              opacity: 0,
              y: -50,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: resolve,
            });
          });
        },
        enter(data: ITransitionData) {
          window.scrollTo(0, 0);

          return new Promise((resolve) => {
            gsap.from(data.next.container, {
              opacity: 0,
              y: 50,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                initScrollTrigger();
                resolve();
              },
            });
          });
        },
      },
    ],
    views: [
      {
        namespace: "home",
        afterEnter() {
          window.initHeroAnimations?.();
        },
      },
    ],
  });
}

declare global {
  interface Window {
    initHeroAnimations?: () => void;
  }
}
