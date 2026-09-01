import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "그리다, 공간 — 시공 포트폴리오",
};

export default function PortfolioPage() {
  return (
    <main className="px-5 pb-24 pt-44 sm:px-8 md:pb-32 md:pt-48">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm tracking-[0.22em] text-muted">포트폴리오</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          시공 사례
        </h1>
        <div className="mt-6 h-px w-12 bg-foreground" />
        <p className="mt-5 max-w-xl text-pretty break-keep text-muted">
          현장별로 정리한 시공 사례입니다. 카테고리로 분류해 보시고, 항목을
          누르면 상세 사진과 내용을 확인하실 수 있습니다.
        </p>

        <PortfolioGrid />
      </div>
    </main>
  );
}
