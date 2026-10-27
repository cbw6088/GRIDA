import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "도배 블로그",
  description:
    "합지와 실크, 광폭·소폭, 도배 비용, 시공 순서, 입주 전 일정까지. 서울·경기 도배 전에 보면 좋은 안내 글입니다.",
  keywords: [
    "도배 블로그",
    "합지 실크 차이",
    "광폭합지",
    "소폭합지",
    "도배 비용",
    "도배 후 관리",
    "입주 전 도배",
  ],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main className="px-5 pb-24 pt-44 sm:px-8 md:pb-32 md:pt-48">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm tracking-[0.22em] text-muted">블로그</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          도배하기 전에
          <br />
          보면 좋은 글
        </h1>
        <div className="mt-6 h-px w-12 bg-foreground" />
        <p className="mt-5 max-w-xl text-pretty break-keep text-muted">
          상담에서 자주 나누는 이야기를 글로 정리했습니다. 벽지 비교부터 비용,
          시공 순서, 입주 전 일정까지 필요한 글부터 읽어 보세요.
        </p>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </ul>
      </div>
    </main>
  );
}
