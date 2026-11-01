"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PortfolioTransitionContextValue = {
  startPortfolioTransition: () => void;
};

const PortfolioTransitionContext =
  createContext<PortfolioTransitionContextValue | null>(null);

const curtainVariants = {
  hidden: { y: "100%" },
  cover: {
    y: "0%",
    transition: {
      duration: 0.52,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
  reveal: {
    y: "-100%",
    transition: {
      duration: 0.62,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  cover: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.16, duration: 0.3, ease: "easeOut" as const },
  },
  reveal: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

/**
 * Keeps the transition curtain mounted while Next swaps routes, so the new
 * portfolio page appears from behind it instead of cutting in abruptly.
 */
export function PortfolioTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const controls = useAnimationControls();
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const pendingNavigation = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const finishTransition = useCallback(() => {
    pendingNavigation.current = false;
    setIsTransitioning(false);
  }, []);

  const startPortfolioTransition = useCallback(() => {
    if (pendingNavigation.current || pathname === "/portfolio") return;

    if (prefersReducedMotion) {
      router.push("/portfolio");
      return;
    }

    pendingNavigation.current = true;
    setIsTransitioning(true);

    void controls.start("cover").then(() => {
      router.push("/portfolio");
    });
  }, [controls, pathname, prefersReducedMotion, router]);

  useEffect(() => {
    if (!pendingNavigation.current || pathname !== "/portfolio") return;

    const frame = window.requestAnimationFrame(() => {
      void controls.start("reveal").then(finishTransition);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [controls, finishTransition, pathname]);

  return (
    <PortfolioTransitionContext.Provider value={{ startPortfolioTransition }}>
      {children}

      <motion.div
        aria-hidden
        initial="hidden"
        animate={controls}
        variants={curtainVariants}
        className={`fixed inset-0 z-[200] overflow-hidden bg-black text-white ${
          isTransitioning ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="relative flex h-full flex-col justify-between px-5 py-6 md:px-[clamp(24px,5vw,100px)] md:py-10">
          <motion.p
            variants={contentVariants}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 md:text-[13px]"
          >
            Selected works <span className="ml-1 text-white">&#10022;</span>
          </motion.p>

          <motion.div variants={contentVariants} className="pb-[14vh]">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white/60 md:text-[13px]">
              Chi-Linh (Krist) Tran
            </p>
            <h2 className="font-display text-[clamp(3.5rem,15vw,13rem)] uppercase leading-[0.78] tracking-[-0.055em]">
              Showreel
            </h2>
          </motion.div>

          <motion.div
            variants={contentVariants}
            className="flex items-center justify-between border-t border-white/30 pt-3 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-white/70 md:text-[13px]"
          >
            <span>Scroll through the magic</span>
            <span aria-hidden>&#8599;</span>
          </motion.div>
        </div>
      </motion.div>
    </PortfolioTransitionContext.Provider>
  );
}

export function usePortfolioTransition() {
  const context = useContext(PortfolioTransitionContext);

  if (!context) {
    throw new Error(
      "usePortfolioTransition must be used within PortfolioTransitionProvider.",
    );
  }

  return context;
}
