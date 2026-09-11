import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "도배 시공 포트폴리오",
  description:
    "서울 서초·송파 주거 공간과 역삼동 상업 공간 도배 시공 사례입니다. 시공 전후 사진으로 인테리어 마감과 도배 시공 결과를 확인하세요.",
  keywords: [
    "도배 포트폴리오",
    "도배 시공 사례",
    "주거 도배 시공",
    "상업 도배 시공",
    "인테리어 시공 사례",
    "서초 도배",
    "송파 도배",
    "역삼 도배",
  ],
  path: "/portfolio",
});

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
