import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: "그리다, 공간 — 도배 시공 소개",
};

const values = [
  {
    title: "바탕부터 챙깁니다",
    text: "벽지 위 마감만 보지 않습니다. 면 정리와 바탕 작업이 탄탄해야 결과도 오래갑니다.",
    tone: "rgba(142, 158, 148, 0.28)",
    accent: "rgba(142, 158, 148, 0.55)",
  },
  {
    title: "마감은 단정하게",
    text: "이음새, 코너, 문틀 주변까지 시선이 머무는 곳을 꼼꼼히 다듬습니다.",
    tone: "rgba(188, 160, 138, 0.28)",
    accent: "rgba(188, 160, 138, 0.55)",
  },
  {
    title: "상담은 쉽게",
    text: "합지·실크처럼 자주 쓰는 벽지를 중심으로, 공간과 예산에 맞게 선택지를 정리해 드립니다.",
    tone: "rgba(132, 148, 168, 0.28)",
    accent: "rgba(132, 148, 168, 0.55)",
  },
];

const steps = [
  {
    title: "상담",
    text: "공간 용도, 원하시는 분위기, 대략적인 범위를 먼저 여쭙습니다.",
  },
  {
    title: "현장·견적",
    text: "벽면 상태와 면적을 보고, 시공 범위와 일정을 맞춰 드립니다.",
  },
  {
    title: "시공",
    text: "바탕 작업부터 벽지 시공까지 차근차근 진행합니다.",
  },
  {
    title: "마무리",
    text: "마감 상태를 함께 확인하고, 이후 관리에 필요한 안내를 드립니다.",
  },
];

export default function IntroductionPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line px-5 pb-20 pt-44 sm:px-8 md:pb-28 md:pt-48">
        <div
          className="animate-orb-breathe pointer-events-none absolute -right-[8%] top-[10%] h-[22rem] w-[22rem] rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-sage), 0.22)" }}
          aria-hidden
        />
        <div
          className="animate-drift-xy pointer-events-none absolute bottom-16 right-[18%] hidden h-28 w-28 md:block"
          style={{ background: "rgba(var(--shape-clay), 0.26)" }}
          aria-hidden
        />
        <div
          className="animate-drift-y pointer-events-none absolute left-[12%] top-36 h-16 w-16 rotate-12"
          style={{ background: "rgba(var(--shape-sand), 0.32)" }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="animate-fade-up text-sm tracking-[0.22em] text-muted">
            소개
          </p>
          <h1 className="animate-fade-up-1 mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[1.12] tracking-tight text-foreground">
            벽을 새로 그리고,
            <br />
            공간을 다시 완성합니다.
          </h1>
          <div className="animate-draw-line mt-6 h-px w-16 bg-foreground/80" />
          <p className="animate-fade-up-2 mt-6 max-w-xl text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
            {siteConfig.name}은 도배 시공으로 집과 공간의 분위기를 바꿉니다.
            눈에 잘 띄지 않는 바탕부터, 매일 마주하는 마감까지 차분히
            챙깁니다.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-soft-pulse pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-slate), 0.16)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative">
            <div
              className="absolute -left-3 top-0 h-16 w-px"
              style={{ background: "rgba(var(--shape-sage), 0.8)" }}
              aria-hidden
            />
            <p className="text-sm tracking-[0.22em] text-muted">브랜드</p>
            <h2 className="mt-4 text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl">
              그리다, 공간
            </h2>
          </div>
          <div className="space-y-6 text-pretty break-keep text-base leading-8 text-muted sm:text-[1.05rem]">
            <p>
              이름처럼, 우리는 벽 위에 공간을 다시 그립니다. 도배는 짧은 공사이지만
              집의 인상은 오래 남습니다. 그래서 빠른 마무리보다, 정확한 면과
              단정한 마감을 우선합니다.
            </p>
            <p>
              주로 합지·실크처럼 생활 공간에서 많이 쓰는 벽지를 중심으로
              상담합니다. 어떤 벽지가 맞을지 헷갈리실 때는{" "}
              <Link
                href="/wallpaper"
                className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
              >
                도배지 안내
              </Link>
              를 먼저 보셔도 좋습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-b border-line px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm tracking-[0.22em] text-muted">약속</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            시공에서 지키는 것
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((item, index) => (
              <li key={item.title} className="group">
                <div
                  className="relative flex min-h-[280px] flex-col justify-between overflow-hidden p-6 transition-transform duration-700 ease-out group-hover:-translate-y-0.5"
                  style={{ background: item.tone }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
                    style={{ background: item.accent, opacity: 0.45 }}
                    aria-hidden
                  />
                  <div
                    className="absolute right-5 top-5 h-8 w-8 border transition-transform duration-500 group-hover:rotate-45"
                    style={{ borderColor: item.accent }}
                    aria-hidden
                  />
                  <p className="relative text-xs tracking-[0.18em] text-muted">
                    0{index + 1}
                  </p>
                  <div className="relative">
                    <h3 className="text-xl font-medium tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-orb-breathe pointer-events-none absolute right-[8%] top-10 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-clay), 0.18)" }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-sm tracking-[0.22em] text-muted">진행</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            이렇게 진행됩니다
          </h2>
          <p className="mt-4 max-w-xl text-pretty break-keep text-muted">
            큰 흐름만 먼저 알려 드립니다. 상세 일정은 현장과 범위에 맞춰
            조율합니다.
          </p>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative border-t border-line pt-6">
                <span
                  className="absolute -top-px left-0 h-px w-10"
                  style={{ background: "rgba(var(--shape-sage), 0.9)" }}
                  aria-hidden
                />
                <p className="text-xs tracking-[0.18em] text-muted">
                  Step 0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-soft-pulse pointer-events-none absolute -right-12 bottom-8 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-slate), 0.18)" }}
          aria-hidden
        />
        <div
          className="animate-drift-spin pointer-events-none absolute bottom-16 right-[24%] hidden h-16 w-16 rounded-full border md:block"
          style={{
            borderColor: "rgba(var(--shape-sage), 0.4)",
            background: "rgba(var(--shape-sage), 0.1)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm tracking-[0.22em] text-muted">연락하기</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              공간을 함께 그려 볼까요?
            </h2>
            <p className="mt-4 max-w-md text-pretty break-keep text-muted">
              시공 범위와 일정 상담이 필요하시면 편하게 문의해 주세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/wallpaper"
              className="inline-flex h-11 items-center border border-line px-5 text-sm text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              도배지 안내
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
            >
              상담 문의
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
