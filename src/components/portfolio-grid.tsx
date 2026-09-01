"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  getCategoryLabel,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategoryId,
  type PortfolioProject,
} from "@/lib/portfolio";

type FilterId = "all" | PortfolioCategoryId;

function PortfolioCard({ project }: { project: PortfolioProject }) {
  const categoryLabel = getCategoryLabel(project.category);

  return (
    <li className="group">
      <Link
        href={`/portfolio/${project.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-soft">
          {project.preview.src ? (
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ background: project.preview.tone ?? "var(--soft)" }}
              aria-hidden
            />
          )}
          <div className="absolute right-5 top-5 h-8 w-8 border border-foreground/15 transition-transform duration-500 group-hover:rotate-45" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent p-5 pt-16">
            <p className="text-xs tracking-[0.18em] text-muted">{categoryLabel}</p>
            <p className="mt-2 text-xl font-medium tracking-tight text-foreground">
              {project.title}
            </p>
            {project.location ? (
              <p className="mt-2 text-sm text-muted">{project.location}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return portfolioProjects;
    return portfolioProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`inline-flex h-9 items-center border px-3 text-sm transition-colors ${
            activeFilter === "all"
              ? "border-foreground bg-foreground text-white"
              : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
          }`}
        >
          전체
        </button>
        {portfolioCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveFilter(category.id)}
            className={`inline-flex h-9 items-center border px-3 text-sm transition-colors ${
              activeFilter === category.id
                ? "border-foreground bg-foreground text-white"
                : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-line bg-soft px-6 py-14 text-center">
          <p className="text-sm tracking-[0.18em] text-muted">준비 중</p>
          <p className="mt-3 text-base text-foreground">
            해당 카테고리의 시공 사례를 준비하고 있습니다.
          </p>
        </div>
      )}
    </>
  );
}
