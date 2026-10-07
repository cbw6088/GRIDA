import type { Metadata } from "next";
import Link from "next/link";
import { WallpaperPreview } from "@/components/wallpaper-preview";
import { previewDisclaimer } from "@/lib/wallpaper-preview";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "도배 미리보기",
  description:
    "빌라, 아파트, 원룸, 사무실 예시에 합지와 실크 벽지를 입혀 질감과 색을 미리 확인합니다. 실제 제품과 같지 않을 수 있습니다.",
  keywords: ["도배 미리보기", "합지 소폭", "합지 광폭", "실크 벽지", "벽지 질감"],
  path: "/wallpaper/preview",
});

export default function WallpaperPreviewPage() {
  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 md:pb-32 md:pt-48">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div>
          <p className="text-sm tracking-[0.22em] text-muted">미리보기</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            벽에 입혀 보기
          </h1>
          <div className="mt-6 h-px w-12 bg-foreground" />
        </div>
        <div className="order-2 mt-10 max-w-2xl lg:order-none lg:mt-6">
          <p className="text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
            빌라, 아파트, 원룸, 사무실입니다. 합지 소폭·광폭과 실크를 바꿔 보고, 페인트·회벽·패브릭
            질감과 색을 입혀 보세요. 정면 벽과 천장도 따로 고를 수 있습니다. 합지 이음은
            소폭 530mm, 광폭 930mm이고, 실크는 이음이 보이지 않습니다.
          </p>
          <p className="mt-4 text-pretty break-keep text-sm leading-6 text-foreground">
            {previewDisclaimer}
          </p>
        </div>

        <div className="order-1 mt-8 lg:order-none lg:mt-12">
          <WallpaperPreview />
        </div>

        <p className="order-3 mt-10 text-sm text-muted">
          <Link href="/wallpaper" className="transition-colors hover:text-foreground">
            도배지 안내로 돌아가기
          </Link>
        </p>
      </div>
    </main>
  );
}
