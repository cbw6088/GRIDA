type CornerMarkProps = {
  className?: string;
};

export function CornerMark({ className = "right-4 top-4 h-8 w-8" }: CornerMarkProps) {
  return (
    <span
      className={`pointer-events-none absolute border border-foreground/15 ${className}`}
      aria-hidden
    />
  );
}
