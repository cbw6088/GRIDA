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
              src="/brand/logo-d-mark.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-cover"
            />
            <span className="text-lg font-medium tracking-tight">
              {siteConfig.name}
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
