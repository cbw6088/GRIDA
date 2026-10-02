type SilkTextureProps = {
  variant?: "weave" | "twill";
};

export function SilkTexture({ variant = "weave" }: SilkTextureProps) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 ${
        variant === "twill" ? "silk-twill" : "silk-weave"
      }`}
      aria-hidden
    />
  );
}
