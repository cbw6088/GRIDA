"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#ececec] bg-white px-5 sm:px-8">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo.png"
            alt=""
            width={80}
            height={80}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="flex flex-col items-start justify-center gap-1">
            <span
              className="relative block h-6 shrink-0 sm:h-7"
              style={{ aspectRatio: "807 / 173" }}
            >
              <Image
                src="/brand/wordmark-ko.png"
                alt="그리다, 공간"
                fill
                sizes="150px"
                className="object-contain object-left"
                priority
              />
            </span>
            <span className="whitespace-nowrap text-[10px] font-light leading-none tracking-[0.02em] text-muted sm:text-[11px]">
              {siteConfig.slogan}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="주 메뉴">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm transition-colors hover:text-foreground ${
                isActive(pathname, item.href) ? "text-foreground" : "text-muted"
              }`}
            >
              {item.label}
              {isActive(pathname, item.href) ? (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground" />
              ) : null}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-visible text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-5 w-5" aria-hidden>
            <span
              className={`absolute left-0 block h-px w-full origin-center bg-foreground transition-all duration-300 ${
                open
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-foreground transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full origin-center bg-foreground transition-all duration-300 ${
                open
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-white px-5 py-4 md:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2.5 text-sm ${
                    isActive(pathname, item.href)
                      ? "text-foreground"
                      : "text-muted"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
