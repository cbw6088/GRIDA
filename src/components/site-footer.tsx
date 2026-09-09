import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-70"
          >
            <Image
              src="/brand/logo.png"
              alt=""
              width={72}
              height={72}
              className="h-9 w-9 object-contain"
            />
            <span className="flex flex-col justify-center gap-0.5">
              <Image
                src="/brand/wordmark-ko.png"
                alt="그리다, 공간"
                width={168}
                height={36}
                className="h-[18px] w-auto"
              />
              <Image
                src="/brand/wordmark-en.png"
                alt="Wallpapering & Space Design"
                width={144}
                height={12}
                className="h-[6px] w-auto"
              />
            </span>
          </Link>
          <p className="mt-2 text-sm text-muted">{siteConfig.description}</p>
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
