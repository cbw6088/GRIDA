import { OptimizedImage } from "@/components/optimized-image";
import Link from "next/link";
import type { BlogBlock } from "@/lib/posts";

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="mt-12">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${block.text}-${index}`}
              className="mt-14 text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "p") {
          return (
            <p
              key={`${block.text.slice(0, 24)}-${index}`}
              className="mt-5 text-pretty break-keep text-base leading-8 text-muted"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={`list-${index}`} className="mt-5 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2 text-pretty break-keep leading-8 text-muted">
                  <span
                    className="mt-3.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "figure") {
          return (
            <figure key={block.image.src} className="mt-8">
              <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                <OptimizedImage
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <figcaption className="mt-3 text-pretty break-keep text-sm leading-6 text-muted">
                {block.image.caption}
              </figcaption>
            </figure>
          );
        }

        if (block.type === "pair") {
          return (
            <div
              key={`pair-${index}`}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              {block.images.map((image) => (
                <figure key={image.src}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                  </div>
                  <figcaption className="mt-3 text-pretty break-keep text-sm leading-6 text-muted">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          );
        }

        return (
          <nav key={`links-${index}`} className="mt-12 border-t border-line pt-8" aria-label={block.title}>
            <p className="text-sm tracking-[0.16em] text-muted">{block.title}</p>
            <ul className="mt-4 space-y-2">
              {block.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-foreground transition-all duration-300 hover:gap-3 hover:opacity-60"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </div>
  );
}
