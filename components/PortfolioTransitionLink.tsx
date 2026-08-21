"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { usePortfolioTransition } from "@/components/PortfolioTransitionProvider";

type PortfolioTransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onNavigate"
>;

/** A normal Next Link that adds the home-to-portfolio curtain on regular navigation. */
export default function PortfolioTransitionLink({
  ...props
}: PortfolioTransitionLinkProps) {
  const { startPortfolioTransition } = usePortfolioTransition();

  return (
    <Link
      {...props}
      href="/portfolio"
      onNavigate={(event) => {
        event.preventDefault();
        startPortfolioTransition();
      }}
    />
  );
}
