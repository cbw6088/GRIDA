import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "연락하기",
  description: "그리다, 공간 — 상담 및 문의",
};

const prepareItems = [
  "시공하려는 공간 (거실, 방, 상가 등)",
  "대략적인 범위나 방 개수",
  "원하시는 일정 (급하신 정도)",
  "관심 있는 벽지 (합지 / 실크 등)",
];

export default function ContactPage() {
  const { phoneDisplay, phoneTel, email, area } = siteConfig.contact;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-line px-5 pb-20 pt-44 sm:px-8 md:pb-28 md:pt-48">
        <div
          className="animate-orb-breathe pointer-events-none absolute -right-[6%] top-[12%] h-[20rem] w-[20rem] rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-slate), 0.2)" }}
          aria-hidden
        />
        <div
          className="animate-drift-xy pointer-events-none absolute bottom-20 right-[20%] hidden h-24 w-24 md:block"
          style={{ background: "rgba(var(--shape-clay), 0.24)" }}
          aria-hidden
        />
        <div
          className="animate-drift-y pointer-events-none absolute left-[10%] top-40 h-14 w-14 rotate-12"
          style={{ background: "rgba(var(--shape-sage), 0.28)" }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="animate-fade-up text-sm tracking-[0.22em] text-muted">
            연락하기
          </p>
          <h1 className="animate-fade-up-1 mt-5 max-w-2xl text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[1.12] tracking-tight text-foreground">
            상담 및 문의
          </h1>
          <div className="animate-draw-line mt-6 h-px w-16 bg-foreground/80" />
          <p className="animate-fade-up-2 mt-6 max-w-xl text-pretty break-keep text-base leading-8 text-muted sm:text-lg">
            견적과 일정 상담이 필요하시면 편하게 연락해 주세요. 전화·문자·메일을
            남겨 주시면 확인 후 연락드립니다.
          </p>
          <div className="animate-fade-up-3 mt-10 flex flex-wrap gap-3">
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
            >
              전화하기
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex h-11 items-center border border-line bg-white/60 px-5 text-sm text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              메일 보내기
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-soft-pulse pointer-events-none absolute -left-16 top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-sage), 0.16)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-sm tracking-[0.22em] text-muted">연락처</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
              직접 연락
            </h2>

            <dl className="mt-10 space-y-8">
              <div className="relative border-t border-line pt-6 pl-4">
                <span
                  className="absolute left-0 top-6 h-3 w-px"
                  style={{ background: "rgba(var(--shape-sage), 0.9)" }}
                  aria-hidden
                />
                <dt className="text-sm tracking-[0.18em] text-muted">전화</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${phoneTel}`}
                    className="text-xl text-foreground transition-opacity hover:opacity-60"
                  >
                    {phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="relative border-t border-line pt-6 pl-4">
                <span
                  className="absolute left-0 top-6 h-3 w-px"
                  style={{ background: "rgba(var(--shape-clay), 0.9)" }}
                  aria-hidden
                />
                <dt className="text-sm tracking-[0.18em] text-muted">이메일</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${email}`}
                    className="break-all text-xl text-foreground transition-opacity hover:opacity-60"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div className="relative border-t border-line pt-6 pl-4">
                <span
                  className="absolute left-0 top-6 h-3 w-px"
                  style={{ background: "rgba(var(--shape-slate), 0.9)" }}
                  aria-hidden
                />
                <dt className="text-sm tracking-[0.18em] text-muted">시공 지역</dt>
                <dd className="mt-2 text-xl text-foreground">{area}</dd>
                <p className="mt-2 text-sm text-muted">
                  그 외 인근 지역은 일정에 따라 상담 가능합니다.
                </p>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-sm tracking-[0.22em] text-muted">안내</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
              문의 전에 알려주시면
              <br />
              좋아요
            </h2>
            <p className="mt-4 text-pretty break-keep leading-7 text-muted">
              아래 내용이 있으면 상담이 더 빨라집니다. 다 모르셔도 괜찮으니,
              알고 계신 부분만 말씀해 주세요.
            </p>

            <ul className="mt-8 space-y-3">
              {prepareItems.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 border border-line px-4 py-3 text-sm text-foreground"
                >
                  <span className="text-muted">0{index + 1}</span>
                  <span className="text-pretty break-keep">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-7 text-muted">
              벽지 종류가 궁금하시면{" "}
              <Link
                href="/wallpaper"
                className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
              >
                도배지 안내
              </Link>
              도 함께 참고해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-28">
        <div
          className="animate-orb-breathe pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(var(--shape-clay), 0.18)" }}
          aria-hidden
        />
        <div
          className="animate-drift-spin pointer-events-none absolute bottom-16 right-[26%] hidden h-16 w-16 rounded-full border md:block"
          style={{
            borderColor: "rgba(var(--shape-sage), 0.4)",
            background: "rgba(var(--shape-sage), 0.1)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-[0.22em] text-muted">응답</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              남겨 주시면 확인 후
              <br />
              연락드립니다
            </h2>
            <p className="mt-4 max-w-md text-pretty break-keep text-muted">
              통화가 어려우시면 문자나 메일로 남겨 주셔도 됩니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${phoneTel}`}
              className="relative inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85"
            >
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${email}`}
              className="relative inline-flex h-11 items-center border border-line px-5 text-sm text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              {email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
