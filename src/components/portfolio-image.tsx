import Image from "next/image";
import type { PortfolioImage as PortfolioImageType } from "@/lib/portfolio";

type PortfolioImageProps = {
  image: PortfolioImageType;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function PortfolioImage({
  image,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: PortfolioImageProps) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ background: image.tone ?? "var(--soft)" }}
      role="img"
      aria-label={image.alt}
    />
  );
}
