import { OptimizedImage } from "@/components/optimized-image";
import Link from "next/link";
import { getPostHref, type BlogPost } from "@/lib/posts";

export function BlogCard({
  post,
  priority = false,
  heading = "h2",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  post: BlogPost;
  priority?: boolean;
  heading?: "h2" | "h3";
  sizes?: string;
}) {
  const Title = heading;

  return (
    <li className="group">
      <Link
        href={getPostHref(post)}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-soft">
          <OptimizedImage
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes={sizes}
          />
        </div>
        <p className="mt-4 text-xs tracking-[0.18em] text-muted">{post.category}</p>
        <Title className="mt-2 text-pretty break-keep text-xl font-medium tracking-tight text-foreground transition-opacity duration-300 group-hover:opacity-70">
          {post.title}
        </Title>
        <p className="mt-2 line-clamp-3 text-pretty break-keep text-sm leading-7 text-muted">
          {post.excerpt}
        </p>
      </Link>
    </li>
  );
}
