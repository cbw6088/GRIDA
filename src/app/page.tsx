import Link from "next/link";
import { HeroGeometry } from "@/components/hero-geometry";
import { siteConfig } from "@/lib/site";

const previewWorks = [
  {
    title: "거실 도배",
    type: "주거 공간",
    fill: "rgba(142, 158, 148, 0.28)",
    accent: "rgba(142, 158, 148, 0.55)",
  },
  {
    title: "침실 리모델링",
    type: "주거 공간",
    fill: "rgba(188, 160, 138, 0.28)",
    accent: "rgba(188, 160, 138, 0.55)",
  },
  {
    title: "상업 공간 마감",
    type: "상업 공간",
    fill: "rgba(132, 148, 168, 0.28)",
    accent: "rgba(132, 148, 168, 0.55)",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[100dvh] overflow-hidden bg-white">
        <HeroGeometry />

        <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-44 sm:px-8">
          <p className="animate-fade-up text-sm tracking-[0.22em] text-muted">
            도배 시공
          </p>
          <h1 className="animate-fade-up-1 mt-5 text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[1.08] tracking-tight text-foreground">
            {siteConfig.name}
          </h1>
          <div className="animate-draw-line mt-6 h-px w-16 bg-foreground/80" />
          <p className="animate-fade-up-2 mt-6 max-w-md text-pretty break-keep text-base leading-relaxed text-muted sm:text-lg">
            공간을 그리고, 벽을 완성하다.
          </p>
          <div className="animate-fade-up-3 mt-10 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
            >
              시공 사례 보기
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center border border-line bg-white/60 px-5 text-sm text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              상담 문의
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-soft-pulse pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-sage), 0.18)" }}
          aria-hidden
        />
        <div
          className="animate-drift-spin pointer-events-none absolute bottom-10 right-[12%] h-24 w-24"
          style={{ background: "rgba(var(--shape-clay), 0.22)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative">
            <div
              className="absolute -left-3 top-0 h-16 w-px"
              style={{ background: "rgba(var(--shape-sage), 0.8)" }}
              aria-hidden
            />
            <p className="text-sm tracking-[0.22em] text-muted">소개</p>
            <h2 className="mt-4 text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl">
              벽에서 시작하는
              <br />
              공간의 분위기
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-xl text-pretty break-keep text-base leading-8 text-muted sm:text-[1.05rem]">
              {siteConfig.name}은 도배 시공으로 집과 공간의 결을 다시 만듭니다.
              꼼꼼한 바탕 작업과 깔끔한 마감으로, 벽이 곧 공간의 표정이 되게
              합니다.
            </p>
            <Link
              href="/introduction"
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm text-foreground transition-all duration-300 hover:gap-3 hover:opacity-60"
            >
              브랜드 소개 보기
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-t border-line px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm tracking-[0.22em] text-muted">포트폴리오</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                최근 시공
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-sm text-foreground transition-all duration-300 hover:opacity-60"
            >
              전체 보기 →
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {previewWorks.map((work, index) => (
              <li key={work.title} className="group">
                <div
                  className="relative aspect-[4/5] overflow-hidden transition-transform duration-700 ease-out group-hover:-translate-y-0.5"
                  style={{ background: work.fill }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-36 w-36 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: work.accent,
                      opacity: 0.55,
                    }}
                  />
                  <div
                    className="absolute right-5 top-5 h-9 w-9 border transition-transform duration-500 group-hover:rotate-45"
                    style={{ borderColor: work.accent }}
                  />
                  <div
                    className="absolute left-5 top-5 h-2 w-2 rounded-full"
                    style={{ background: work.accent }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs tracking-[0.18em] text-muted">
                      {work.type}
                    </p>
                    <p className="mt-2 text-xl font-medium tracking-tight text-foreground">
                      {work.title}
                    </p>
                    <p className="mt-3 text-xs text-muted">0{index + 1}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-orb-breathe pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-slate), 0.2)" }}
          aria-hidden
        />
        <div
          className="animate-drift-y pointer-events-none absolute bottom-8 right-[22%] h-20 w-20 rounded-full border"
          style={{
            borderColor: "rgba(var(--shape-sage), 0.4)",
            background: "rgba(var(--shape-sage), 0.1)",
          }}
          aria-hidden
        />
        <div
          className="animate-drift-xy pointer-events-none absolute bottom-10 right-28 hidden h-14 w-14 md:block"
          style={{ background: "rgba(var(--shape-clay), 0.28)" }}
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm tracking-[0.22em] text-muted">연락하기</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              공간을 함께 그려 볼까요?
            </h2>
            <p className="mt-4 max-w-md text-pretty break-keep text-muted">
              상담과 견적 문의는 언제든 남겨 주세요.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
          >
            문의하기
          </Link>
        </div>
      </section>
    </main>
  );
}
