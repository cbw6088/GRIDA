"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PortfolioImage } from "@/components/portfolio-image";
import { OptimizedImage } from "@/components/optimized-image";
import {
  getProjectLightboxItems,
  type PortfolioImage as PortfolioImageType,
  type PortfolioProject,
} from "@/lib/portfolio";

type PortfolioProjectGalleryProps = {
  project: Pick<PortfolioProject, "sections" | "gallery">;
};

const swipeThreshold = 48;

export function PortfolioProjectGallery({
  project,
}: PortfolioProjectGalleryProps) {
  const items = getProjectLightboxItems(project);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const titleId = useId();
  let nextLightboxIndex = 0;

  const activeItem = openIndex === null ? null : items[openIndex];

  function openAt(index: number) {
    setOpenIndex(index);
  }

  function closeLightbox() {
    setOpenIndex(null);
  }

  function showPrevious() {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current - 1 + items.length) % items.length;
    });
  }

  function showNext() {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + 1) % items.length;
    });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
    }
    if (openIndex === null && dialog.open) {
      dialog.close();
    }
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const total = items.length;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpenIndex((current) => {
          if (current === null || total === 0) return current;
          return (current - 1 + total) % total;
        });
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpenIndex((current) => {
          if (current === null || total === 0) return current;
          return (current + 1) % total;
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, items.length]);

  function takeLightboxIndex(image: PortfolioImageType) {
    if (!image.src) return null;
    const index = nextLightboxIndex;
    nextLightboxIndex += 1;
    return index;
  }

  return (
    <>
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
                          <GalleryFigure
                            key={`${section.title}-${phase.label}-${image.alt}-${index}`}
                            image={image}
                            lightboxIndex={takeLightboxIndex(image)}
                            onOpen={openAt}
                            priority={
                              section.title === project.sections?.[0]?.title &&
                              phaseIndex === 0 &&
                              index === 0
                            }
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : section.images?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.images.map((image, index) => (
                    <GalleryFigure
                      key={`${section.title}-${image.alt}-${index}`}
                      image={image}
                      lightboxIndex={takeLightboxIndex(image)}
                      onOpen={openAt}
                      priority={
                        section.title === project.sections?.[0]?.title &&
                        index === 0
                      }
                      sizes="(max-width: 640px) 100vw, 50vw"
                      showCaption
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      ) : project.gallery?.length ? (
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <GalleryFigure
              key={`${image.alt}-${index}`}
              image={image}
              lightboxIndex={takeLightboxIndex(image)}
              onOpen={openAt}
              priority={index === 0}
              sizes={
                index === 0 && project.gallery!.length % 2 === 1
                  ? "100vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
              className={
                index === 0 && project.gallery!.length % 2 === 1
                  ? "md:col-span-2 md:aspect-[16/9]"
                  : "aspect-[4/5]"
              }
              showCaption
            />
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className="portfolio-lightbox m-0 h-dvh max-h-dvh w-screen max-w-none border-0 bg-[#111] p-0 text-white"
        aria-labelledby={activeItem ? titleId : undefined}
        aria-label="시공 사진 크게 보기"
        onClose={closeLightbox}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX == null || endX == null) return;
          const delta = endX - startX;
          if (Math.abs(delta) < swipeThreshold) return;
          if (delta > 0) showPrevious();
          else showNext();
        }}
      >
        {activeItem ? (
          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p
                id={titleId}
                className="min-w-0 truncate text-sm tracking-[0.12em] text-white/70"
              >
                {activeItem.context}
              </p>
              <p className="shrink-0 text-sm tabular-nums text-white/55">
                {openIndex! + 1} / {items.length}
              </p>
            </div>

            <div className="relative min-h-0 flex-1">
              <OptimizedImage
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="min-w-0 text-sm text-white/75">
                {activeItem.caption ?? activeItem.alt}
              </p>
              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex h-11 shrink-0 items-center px-3 text-sm text-white transition-opacity hover:opacity-70"
              >
                닫기
              </button>
            </div>

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-2xl text-white/85 sm:left-3"
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-2xl text-white/85 sm:right-3"
                  aria-label="다음 사진"
                >
                  ›
                </button>
              </>
            ) : null}

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center text-xl text-white/90 sm:right-5"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function GalleryFigure({
  image,
  lightboxIndex,
  onOpen,
  priority = false,
  sizes,
  className = "aspect-[4/5]",
  showCaption = false,
}: {
  image: PortfolioImageType;
  lightboxIndex: number | null;
  onOpen: (index: number) => void;
  priority?: boolean;
  sizes: string;
  className?: string;
  showCaption?: boolean;
}) {
  const canOpen = lightboxIndex !== null;

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {canOpen ? (
        <button
          type="button"
          onClick={() => onOpen(lightboxIndex)}
          className="group absolute inset-0 text-left"
        >
          <PortfolioImage image={image} priority={priority} sizes={sizes} />
          <span className="sr-only">{`${image.alt} 크게 보기`}</span>
          <span
            className="pointer-events-none absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center border border-white/70 bg-white/85 text-foreground opacity-100 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            aria-hidden
          >
            <ExpandIcon />
          </span>
        </button>
      ) : (
        <PortfolioImage image={image} priority={priority} sizes={sizes} />
      )}
      {showCaption && image.caption ? (
        <figcaption className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 text-sm text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M8.5 1.5H12.5V5.5M12.5 1.5L8 6M5.5 12.5H1.5V8.5M1.5 12.5L6 8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
