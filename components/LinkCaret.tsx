export default function LinkCaret({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 8"
      width="10"
      height="10"
      aria-hidden
    >
      <path d="M0 0H8V8L0 0z" fill="currentColor" />
    </svg>
  );
}
