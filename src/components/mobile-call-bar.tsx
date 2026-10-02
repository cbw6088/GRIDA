"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function MobileCallBar() {
  const pathname = usePathname();
  const { phoneDisplay, phoneTel } = siteConfig.contact;

  if (pathname === "/contact") return null;

  return (
    <>
      <div className="h-20 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-5 pt-3 backdrop-blur-sm md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${phoneTel}`}
          className="inline-flex h-11 w-full items-center justify-center bg-foreground text-sm text-white"
        >
          전화하기
          <span className="ml-2 text-white/70">{phoneDisplay}</span>
        </a>
      </div>
    </>
  );
}
