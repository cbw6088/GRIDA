"use client";

import { OptimizedImage } from "@/components/optimized-image";
import Link from "next/link";
import { type MouseEvent, type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { homeBanners } from "@/lib/banners";

const SWAP_MS = 10000;
const DRAG_THRESHOLD = 48;

export function HomeBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const skipClickRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((next + homeBanners.length) % homeBanners.length);
  }, []);

  const goBy = useCallback((delta: number) => {
    setIndex(
      (current) => (current + delta + homeBanners.length) % homeBanners.length,
    );
  }, []);

  useEffect(() => {
    if (paused || dragging || reducedMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % homeBanners.length);
    }, SWAP_MS);

    return () => window.clearInterval(timer);
  }, [index, paused, dragging, reducedMotion]);

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      setDragging(true);
      event.currentTarget.setPointerCapture(drag.pointerId);
    }
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const swiped =
      Math.abs(dx) >= DRAG_THRESHOLD && Math.abs(dx) > Math.abs(dy);

    if (swiped) {
      skipClickRef.current = true;
      goBy(dx < 0 ? 1 : -1);
      window.setTimeout(() => {
        skipClickRef.current = false;
      }, 400);
    }

    if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    }

    dragRef.current = null;
    setDragging(false);
  }

  function onClickCapture(event: MouseEvent<HTMLElement>) {
    if (!skipClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    skipClickRef.current = false;
  }

  return (
    <section
      className={`relative isolate overflow-hidden bg-white touch-pan-y ${
        dragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      aria-roledescription="carousel"
      aria-label="홈 배너"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setPaused(false);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      <div className="relative mt-[4.5rem] min-h-[28rem] sm:mt-20 sm:min-h-[32rem] lg:min-h-[38rem]">
        {homeBanners.map((banner, bannerIndex) => {
          const active = bannerIndex === index;

          return (
            <article
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <OptimizedImage
                  src={banner.image}
                  alt={banner.imageAlt}
                  fill
                  priority={bannerIndex === 0}
                  draggable={false}
                  sizes="100vw"
                  className="object-cover object-left"
                  style={{
                    maskImage:
                      "linear-gradient(to right, #000 0%, #000 55%, rgba(0,0,0,0.6) 78%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, #000 0%, #000 55%, rgba(0,0,0,0.6) 78%, transparent 100%)",
                  }}
                />
              </div>

              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.32) 34%, rgba(255,255,255,0.08) 54%, rgba(255,255,255,0) 68%)",
                }}
              />

              <div className="relative mx-auto flex h-full min-h-[28rem] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-12 sm:min-h-[32rem] sm:px-8 sm:pt-16 lg:min-h-[38rem]">
                <div className="relative max-w-lg">
                  <div
                    className="pointer-events-none absolute -inset-x-5 -inset-y-8 -z-10 sm:-inset-x-8 sm:-inset-y-10"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(ellipse 110% 90% at 18% 46%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.64) 38%, rgba(255,255,255,0) 72%)",
                    }}
                  />
                  <p className="text-sm tracking-[0.22em] text-foreground [text-shadow:0_0_18px_rgba(255,255,255,0.9)]">
                    {banner.kicker}
                  </p>
                  <h2 className="mt-5 text-[clamp(2.1rem,5.4vw,4.25rem)] font-medium leading-[1.12] tracking-tight text-foreground [text-shadow:0_0_28px_rgba(255,255,255,0.95)]">
                    {banner.title}
                  </h2>
                  <div className="mt-6 h-px w-16 bg-foreground" />
                  <p className="mt-6 max-w-md text-pretty break-keep text-base leading-relaxed text-foreground sm:text-lg [text-shadow:0_0_18px_rgba(255,255,255,0.9)]">
                    {banner.description}
                  </p>
                  <div className="mt-10">
                    <Link
                      href={banner.href}
                      tabIndex={active ? 0 : -1}
                      className="inline-flex h-11 cursor-pointer items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-5 sm:bottom-10">
          <div
            className="flex cursor-auto items-center gap-2"
            role="tablist"
            aria-label="배너 선택"
          >
            {homeBanners.map((banner, bannerIndex) => {
              const active = bannerIndex === index;

              return (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-label={`${banner.title} 보기`}
                  aria-selected={active}
                  className={`relative h-1.5 overflow-hidden transition-all duration-500 ${
                    active
                      ? "w-10 bg-foreground"
                      : "w-4 bg-foreground/35 hover:bg-foreground/55"
                  }`}
                  onClick={() => goTo(bannerIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
