import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioImage } from "@/components/portfolio-image";
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
      project.location ? `${project.location} 도배` : "",
    ].filter(Boolean),
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

        {project.sections?.length ? (
          <div className="mt-14 flex flex-col gap-16">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-medium tracking-tight text-foreground">
                  {section.title}
                </h2>
                {section.phases?.length ? (
                  <div className="mt-8 flex flex-col gap-10">
                    {section.phases.map((phase, phaseIndex) => (
                      <div
                        key={`${section.title}-${phase.label}`}
                        className={
                          phaseIndex > 0
                            ? "border-t border-line pt-10"
                            : undefined
                        }
                      >
                        <h3 className="text-sm tracking-[0.18em] text-muted">
                          {phase.label}
                        </h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          {phase.images.map((image, index) => (
                            <figure
                              key={`${section.title}-${phase.label}-${image.alt}-${index}`}
                              className="relative aspect-[4/5] overflow-hidden"
                            >
                              <PortfolioImage
                                image={image}
                                priority={
                                  section.title === project.sections?.[0]?.title &&
                                  phaseIndex === 0 &&
                                  index === 0
                                }
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            </figure>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.images?.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {section.images.map((image, index) => (
                      <figure
                        key={`${section.title}-${image.alt}-${index}`}
                        className="relative aspect-[4/5] overflow-hidden"
                      >
                        <PortfolioImage
                          image={image}
                          priority={
                            section.title === project.sections?.[0]?.title &&
                            index === 0
                          }
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        {image.caption ? (
                          <figcaption className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 text-sm text-muted">
                            {image.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        ) : project.gallery?.length ? (
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <figure
                key={`${image.alt}-${index}`}
                className={`relative overflow-hidden ${
                  index === 0 && project.gallery!.length % 2 === 1
                    ? "md:col-span-2 md:aspect-[16/9]"
                    : "aspect-[4/5]"
                }`}
              >
                <PortfolioImage
                  image={image}
                  priority={index === 0}
                  sizes={
                    index === 0 && project.gallery!.length % 2 === 1
                      ? "100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
                {image.caption ? (
                  <figcaption className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 text-sm text-muted">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}

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
