import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: "그리다, 공간 — 도배 시공 소개",
};

export default function IntroductionPage() {
  return (
    <main className="relative overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pb-32 md:pt-36">
      <div className="pointer-events-none absolute right-[10%] top-32 h-40 w-40 rounded-full border border-line" aria-hidden />
      <div className="pointer-events-none absolute right-[18%] top-52 h-20 w-20 bg-soft" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <p className="text-sm tracking-[0.22em] text-muted">소개</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {siteConfig.name}
          </h1>
          <div className="mt-6 h-px w-12 bg-foreground" />
        </div>
        <div>
          <p className="max-w-xl text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
            그리다, 공간은 도배 시공을 통해 공간의 분위기를 새롭게 완성합니다.
            시공 철학, 작업 방식, 진행 절차는 이후 함께 다듬어 갈 예정입니다.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-opacity hover:opacity-80"
          >
            상담 문의
          </Link>
        </div>
      </div>
    </main>
  );
}
