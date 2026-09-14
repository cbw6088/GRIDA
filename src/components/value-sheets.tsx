"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ValueItem = {
  title: string;
  text: string;
  label: string;
  tone: string;
  accent: string;
};

export function ValueSheets({ values }: { values: ValueItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDropped(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDropped(true);
        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={listRef}
      className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0"
    >
      {values.map((item, index) => (
        <li
          key={item.title}
          className={`group relative md:flex-1 ${index > 0 ? "md:-ml-5" : ""}`}
          style={
            {
              zIndex: index + 1,
              "--drop-delay": `${index * 0.38}s`,
            } as CSSProperties
          }
        >
          <div className="relative h-full transition-transform duration-700 ease-out group-hover:-translate-y-0.5">
            <article
              className={`wallpaper-sheet relative flex h-full min-h-[280px] flex-col justify-between p-6 ${
                dropped ? "is-dropped" : ""
              }`}
              style={{
                background: item.tone,
                boxShadow:
                  index === 0
                    ? undefined
                    : "inset 1px 0 0 rgba(255,255,255,0.45)",
              }}
            >
              <div className="relative flex items-start justify-between gap-4">
                <p
                  className="text-xs tracking-[0.18em]"
                  style={{ color: item.accent }}
                >
                  0{index + 1}
                </p>
                <span
                  className="border bg-white/70 px-2 py-1 text-[11px] tracking-[0.14em] text-foreground"
                  style={{ borderColor: item.accent }}
                >
                  {item.label}
                </span>
              </div>
              <div className="relative mt-16">
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-pretty break-keep text-muted">
                  {item.text}
                </p>
              </div>
            </article>
            <span
              className={`wallpaper-sheet-bar pointer-events-none absolute inset-x-0 h-1.5 rounded-full ${
                dropped ? "is-dropped" : ""
              }`}
              style={{ background: item.accent }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
