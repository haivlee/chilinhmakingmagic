export function MonogramCL({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 [font-family:var(--font-display)] text-[16px] font-light uppercase leading-[100%] tracking-normal text-[var(--color-fg)] ${className ?? ""}`}
      aria-label="C L"
    >
      <span>C</span>
      <span
        className="h-0 w-[33px] shrink-0 border-t border-[var(--color-fg)]"
        aria-hidden
      />
      <span>L</span>
    </div>
  );
}
