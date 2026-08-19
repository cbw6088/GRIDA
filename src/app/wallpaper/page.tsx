import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { wallpaperExtras, wallpaperGuides } from "@/lib/wallpapers";

export const metadata: Metadata = {
  title: "도배지 안내",
  description:
    "합지, 실크, 천연·한지, 뮤럴 등 자주 쓰는 도배지 종류를 고객 기준으로 안내합니다.",
};

export default function WallpaperPage() {
  return (
    <main className="relative overflow-hidden px-5 pb-24 pt-44 sm:px-8 md:pb-32 md:pt-48">
      <div
        className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(var(--shape-sage), 0.18)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[8%] top-40 h-20 w-20 rotate-12"
        style={{ background: "rgba(var(--shape-clay), 0.2)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="text-sm tracking-[0.22em] text-muted">도배지 안내</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          우리 집에 맞는
          <br />
          벽지부터 알아보기
        </h1>
        <div className="mt-6 h-px w-12 bg-foreground" />
        <p className="mt-6 max-w-2xl text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
          도배지는 벽을 덮는 재료를 넘어, 공간의 분위기와 관리 방식을 정하는
          선택입니다. 현장에서 가장 많이 상담하는 종류를 먼저 정리해 두었습니다.
          고민이 남으시면 공간 용도에 맞춰 함께 골라 드립니다.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {wallpaperGuides.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex h-9 items-center border border-line px-3 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-20 flex w-full max-w-6xl flex-col gap-20 md:gap-28">
        {wallpaperGuides.map((item, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-44 grid items-start gap-8 md:grid-cols-2 md:items-stretch md:gap-14"
            >
              <div className={reverse ? "md:order-2" : undefined}>
                <div
                  className="relative min-h-[320px] overflow-hidden md:h-full md:min-h-[560px]"
                  style={{ background: item.tone }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div
                    className="absolute right-4 top-4 h-8 w-8 border border-white/50"
                    aria-hidden
                  />
                </div>
              </div>

              <div className={reverse ? "md:order-1" : undefined}>
                <p className="text-xs tracking-[0.2em] text-muted">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
                  {item.name}
                </h2>
                <p className="mt-5 text-pretty break-keep leading-8 text-muted">
                  {item.summary}
                </p>

                <dl className="mt-8 space-y-5 border-t border-line pt-6">
                  <div>
                    <dt className="text-sm tracking-[0.16em] text-muted">
                      이런 공간에 잘 맞아요
                    </dt>
                    <dd className="mt-2 text-foreground">{item.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-sm tracking-[0.16em] text-muted">
                      알아두면 좋은 점
                    </dt>
                    <dd className="mt-3">
                      <ul className="space-y-2 text-muted">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50"
                              aria-hidden
                            />
                            <span className="text-pretty break-keep">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {item.note ? (
                    <div>
                      <dt className="text-sm tracking-[0.16em] text-muted">
                        상담 팁
                      </dt>
                      <dd className="mt-2 text-pretty break-keep text-muted">
                        {item.note}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <section className="relative mx-auto mt-24 w-full max-w-6xl border-t border-line pt-16 md:mt-32">
        <p className="text-sm tracking-[0.22em] text-muted">그 외 선택지</p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
          상황에 따라 함께 보는 벽지
        </h2>
        <p className="mt-4 max-w-2xl text-pretty break-keep text-muted">
          아래 종류는 전체 도배보다, 특정 벽·특정 조건에서 자주 검토합니다.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {wallpaperExtras.map((item) => (
            <li
              key={item.name}
              className="relative overflow-hidden border border-line p-6"
            >
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full"
                style={{ background: "rgba(var(--shape-mist), 0.35)" }}
                aria-hidden
              />
              <h3 className="relative text-lg font-medium text-foreground">
                {item.name}
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative mx-auto mt-20 w-full max-w-6xl overflow-hidden border border-line px-6 py-12 sm:px-10 md:mt-28">
        <div
          className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full blur-2xl"
          style={{ background: "rgba(var(--shape-slate), 0.2)" }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-[0.22em] text-muted">상담</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              공간에 맞는 벽지, 같이 정해 볼까요?
            </h2>
            <p className="mt-3 max-w-lg text-pretty break-keep text-muted">
              공간 용도와 원하시는 분위기를 듣고, 합지·실크를 중심으로 맞춰
              드립니다.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center bg-foreground px-5 text-sm text-white transition-opacity hover:opacity-80"
          >
            상담 문의
          </Link>
        </div>
      </section>
    </main>
  );
}
