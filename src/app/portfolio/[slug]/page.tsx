import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioProjectGallery } from "@/components/portfolio-project-gallery";
import {
  getCategoryLabel,
  getProjectBySlug,
  getWallpaperGuideHref,
  portfolioProjects,
} from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return pageMetadata({
      title: "도배 시공 포트폴리오",
      description:
        "서울·경기 주거·상업 공간 도배 시공 사례를 확인하세요.",
      keywords: ["도배 포트폴리오", "도배 시공 사례"],
      path: "/portfolio",
    });
  }

  const categoryLabel = getCategoryLabel(project.category);
  const spaceKeyword =
    project.category === "commercial" ? "상업 도배" : "주거 도배";

  return pageMetadata({
    title: `${project.title} 도배 시공`,
    description: [
      project.location,
      categoryLabel,
      project.wallpaper,
      "도배 시공 사례입니다.",
      "시공 전후 사진으로 인테리어 마감을 확인하세요.",
    ]
      .filter(Boolean)
      .join(" "),
    keywords: [
      spaceKeyword,
      "도배 시공 사례",
      "인테리어 시공",
      project.wallpaper,
      project.location ? `${project.location} 도배` : undefined,
    ].filter((keyword): keyword is string => Boolean(keyword)),
    path: `/portfolio/${project.slug}`,
  });
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(project.category);

  return (
    <main className="px-5 pb-24 pt-44 sm:px-8 md:pb-32 md:pt-48">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-muted transition-colors hover:text-foreground"
        >
          ← 포트폴리오로 돌아가기
        </Link>

        <p className="mt-8 text-sm tracking-[0.22em] text-muted">{categoryLabel}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        {project.location ? (
          <p className="mt-3 text-base text-muted">{project.location}</p>
        ) : null}
        {project.wallpaper ? (
          <p className="mt-3 text-base">
            <span className="text-muted">도배지</span>
            <Link
              href={getWallpaperGuideHref(project.wallpaper)}
              className="ml-3 text-foreground transition-opacity hover:opacity-60"
            >
              {project.wallpaper}
            </Link>
          </p>
        ) : null}
        <div className="mt-6 h-px w-12 bg-foreground" />

        <PortfolioProjectGallery project={project} />

        <div className="mt-14 border-t border-line pt-10">
          <p className="text-sm text-muted">비슷한 공간 시공이 필요하신가요?</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex text-sm text-foreground transition-opacity hover:opacity-60"
          >
            상담 문의하기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
