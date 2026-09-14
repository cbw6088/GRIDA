import { OptimizedImage } from "@/components/optimized-image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { phoneDisplay, phoneTel, email, area } = siteConfig.contact;

  return (
    <footer className="border-t border-line px-5 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-70"
          >
            <OptimizedImage
              src="/brand/logo.png"
              alt=""
              width={72}
              height={72}
              className="h-9 w-9 object-contain"
            />
            <span className="flex flex-col items-start justify-center gap-[0.26em] text-[18px]">
              <OptimizedImage
                src="/brand/wordmark-ko.png"
                alt="그리다, 공간"
                width={168}
                height={36}
                className="h-[1em] w-auto"
              />
              <span className="whitespace-nowrap text-[0.4em] font-light leading-none tracking-[0.02em] text-muted">
                {siteConfig.slogan}
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm text-muted">
            {area} 도배 시공
          </p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
            <a
              href={`tel:${phoneTel}`}
              className="transition-colors hover:text-foreground"
            >
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              {email}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="푸터 메뉴">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
