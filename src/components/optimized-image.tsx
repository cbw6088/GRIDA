import Image, { type ImageProps } from "next/image";
import { getImageBlur } from "@/lib/image-blur";

export function OptimizedImage({
  src,
  placeholder,
  blurDataURL,
  ...props
}: ImageProps) {
  const autoBlur = typeof src === "string" ? getImageBlur(src) : undefined;

  return (
    <Image
      src={src}
      placeholder={placeholder ?? (autoBlur ? "blur" : "empty")}
      blurDataURL={blurDataURL ?? autoBlur}
      {...props}
    />
  );
}
