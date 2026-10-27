import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import { BlogPostBody } from "@/components/blog-post-body";
import { OptimizedImage } from "@/components/optimized-image";
import {
  blogPosts,
  formatPostDate,
  getBlogPost,
  getPostHref,
  getRelatedPosts,
} from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return pageMetadata({
      title: "도배 블로그",
      description: "도배 전에 보면 좋은 안내 글입니다.",
      keywords: ["도배 블로그"],
      path: "/blog",
    });
  }

  const metadata = pageMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    path: getPostHref(post),
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.cover.src,
          alt: post.cover.alt,
        },
      ],
    },
  };
}

function articleJsonLd(post: NonNullable<ReturnType<typeof getBlogPost>>) {
  const url = new URL(getPostHref(post), siteConfig.url).href;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: new URL(post.cover.src, siteConfig.url).href,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "ko-KR",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { "@id": `${siteConfig.url}/#business` },
    mainEntityOfPage: url,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <main className="px-5 pb-24 pt-44 sm:px-8 md:pb-32 md:pt-48">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted transition-colors hover:text-foreground"
        >
          ← 블로그로 돌아가기
        </Link>

        <p className="mt-8 text-sm tracking-[0.22em] text-muted">{post.category}</p>
        <h1 className="mt-4 text-pretty break-keep text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        </p>
        <div className="mt-6 h-px w-12 bg-foreground" />
        <p className="mt-6 text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
          {post.lead}
        </p>

        <figure className="mt-10">
          <div className="relative aspect-[4/3] overflow-hidden bg-soft">
            <OptimizedImage
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <figcaption className="mt-3 text-pretty break-keep text-sm leading-6 text-muted">
            {post.cover.caption}
          </figcaption>
        </figure>

        <BlogPostBody blocks={post.blocks} />
      </article>

      <section className="mx-auto mt-20 w-full max-w-3xl border border-line px-6 py-10 sm:px-10">
        <p className="text-sm tracking-[0.22em] text-muted">상담</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground">
          공간에 맞춰 같이 정해 볼까요?
        </h2>
        <p className="mt-3 max-w-lg text-pretty break-keep text-muted">
          방 개수와 원하시는 일정, 합지·실크 중 궁금한 쪽을 알려 주세요.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-opacity hover:opacity-80"
        >
          상담 문의
        </Link>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="mx-auto mt-20 w-full max-w-3xl" aria-labelledby="related-posts">
          <h2 id="related-posts" className="text-2xl font-medium tracking-tight text-foreground">
            다른 글
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <BlogCard
                key={related.slug}
                post={related}
                heading="h3"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
