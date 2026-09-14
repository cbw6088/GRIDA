import type { Metadata } from "next";
import Link from "next/link";
import { ValueSheets } from "@/components/value-sheets";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "도배 시공 소개",
  description:
    "서울·경기 주거·상업 공간 도배 시공 브랜드 그리다, 공간입니다. 바탕 작업부터 단정한 마감까지, 시공 방식과 가치를 소개합니다.",
  keywords: [
    "도배 업체",
    "도배 소개",
    "인테리어 시공",
    "주거 인테리어",
    "상업 인테리어",
  ],
  path: "/introduction",
});

const highlights = ["바탕 작업", "단정한 마감", "쉬운 상담"];

const values = [
  {
    title: "바탕부터 챙깁니다",
    text: "벽지만 바르고 끝내지 않습니다. 면을 고르게 잡고 바탕을 탄탄히 해야 결과도 오래갑니다.",
    label: "바탕",
    tone: "rgba(142, 158, 148, 0.16)",
    accent: "rgb(142, 158, 148)",
  },
  {
    title: "마감은 단정하게",
    text: "이음새, 코너, 문틀 주변처럼 시선이 머무는 곳을 꼼꼼히 다듬습니다.",
    label: "마감",
    tone: "rgba(188, 160, 138, 0.16)",
    accent: "rgb(188, 160, 138)",
  },
  {
    title: "상담은 쉽게",
    text: "합지·실크처럼 자주 쓰는 벽지를 중심으로, 공간과 예산에 맞게 선택지를 정리해 드립니다.",
    label: "상담",
    tone: "rgba(132, 148, 168, 0.16)",
    accent: "rgb(132, 148, 168)",
  },
];

const steps = [
  {
    title: "상담",
    phrases: ["공간 용도와 분위기,", "대략적인 범위를", "먼저 여쭙습니다."],
  },
  {
    title: "현장·견적",
    phrases: ["벽면 상태와 면적을 보고,", "시공 범위와 일정을", "맞춰 드립니다."],
  },
  {
    title: "시공",
    phrases: ["바탕 작업부터", "벽지 시공까지", "차근차근 진행합니다."],
  },
  {
    title: "마무리",
    phrases: [
      "마감 상태를 함께 확인하고,",
      "이후 관리에 필요한",
      "안내를 드립니다.",
    ],
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
          <h1 className="animate-fade-up-1 mt-5 max-w-3xl break-keep text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.12] tracking-tight text-foreground">
            <span className="font-light">벽을 새로 그리고,</span>
            <br />
            <span className="font-medium">공간을 다시 완성합니다.</span>
          </h1>
          <div className="animate-draw-line mt-6 h-px w-16 bg-foreground/80" />
          <p className="animate-fade-up-2 mt-6 max-w-xl text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
            {siteConfig.name}은 도배 시공으로 집과 공간의 분위기를 바꿉니다.
            벽지를 붙이기 전{" "}
            <span className="font-medium text-foreground">바탕</span>을 정리하고,
            이음새와 코너{" "}
            <span className="font-medium text-foreground">마감</span>까지 차분히
            챙깁니다.
          </p>
          <ul className="animate-fade-up-3 mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            {highlights.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-foreground/35" aria-hidden>
                    →
                  </span>
                ) : null}
                <span className="border border-line bg-white/70 px-3 py-1.5 text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
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
          <div className="space-y-6">
            <blockquote
              className="border-l-2 pl-5 text-pretty break-keep text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl"
              style={{ borderColor: "rgb(142, 158, 148)" }}
            >
              도배는 짧은 공사이지만
              <br />
              집의 인상은 오래 남습니다.
            </blockquote>
            <p className="text-pretty break-keep text-base leading-8 text-muted sm:text-[1.05rem]">
              이름처럼, 벽 위에 공간을 다시 그립니다.{" "}
              <span className="font-medium text-foreground">빨리 끝내기보다</span>{" "}
              <span className="font-medium text-foreground">바탕을 탄탄히</span>{" "}
              잡고,{" "}
              <span className="font-medium text-foreground">마감을 단정하게</span>{" "}
              맞춥니다.
            </p>
            <p className="text-pretty break-keep text-base leading-8 text-muted sm:text-[1.05rem]">
              주로{" "}
              <span className="font-medium text-foreground">합지·실크</span>처럼
              생활에서 많이 쓰는 벽지를 중심으로 상담합니다. 어떤 벽지가
              맞을지 고민되시면 도배지 안내를 먼저 보셔도 좋습니다.
            </p>
            <Link
              href="/wallpaper"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-300 hover:gap-3 hover:opacity-60"
            >
              도배지 안내
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-b border-line px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm tracking-[0.22em] text-muted">약속</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            시공에서 지키는 것
          </h2>

          <ValueSheets values={values} />
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
            큰 흐름만 먼저 알려 드립니다. 자세한 일정은 현장과 범위에 맞춰
            조율합니다.
          </p>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <article className="flex h-full flex-col border border-line bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs tracking-[0.18em] text-muted">
                      Step 0{index + 1}
                    </p>
                    {index < steps.length - 1 ? (
                      <span
                        className="hidden text-sm text-foreground/40 lg:inline"
                        aria-hidden
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-pretty break-keep text-muted">
                    {step.phrases.map((phrase) => (
                      <span key={phrase} className="mr-[0.3em] inline-block last:mr-0">
                        {phrase}
                      </span>
                    ))}
                  </p>
                </article>
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

        <div
          className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 border border-line px-6 py-10 sm:px-10 md:flex-row md:items-end md:py-12"
          style={{ background: "rgba(var(--shape-sage), 0.1)" }}
        >
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
              className="inline-flex h-11 items-center gap-2 border border-line bg-white px-5 text-sm text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              도배지 안내
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
            >
              상담 문의
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
