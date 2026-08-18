import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락하기",
  description: "그리다, 공간 — 상담 및 문의",
};

const contacts = [
  { label: "전화", value: "번호 준비 중" },
  { label: "이메일", value: "이메일 준비 중" },
  { label: "시공 지역", value: "지역 정보 준비 중" },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pb-32 md:pt-36">
      <div className="pointer-events-none absolute bottom-24 right-[12%] h-28 w-28 rotate-12 border border-line" aria-hidden />
      <div className="pointer-events-none absolute right-[8%] top-36 h-3 w-3 rounded-full bg-foreground" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <p className="text-sm tracking-[0.22em] text-muted">연락하기</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            상담 및 문의
          </h1>
          <div className="mt-6 h-px w-12 bg-foreground" />
          <p className="mt-5 max-w-sm text-pretty break-keep text-muted">
            견적과 일정 상담이 필요하시면 편하게 연락해 주세요.
          </p>
        </div>
        <dl className="grid max-w-md gap-8 border-t border-line pt-10 md:border-t-0 md:pt-2">
          {contacts.map((item) => (
            <div key={item.label} className="relative pl-4">
              <span className="absolute left-0 top-1.5 h-3 w-px bg-foreground" aria-hidden />
              <dt className="text-sm tracking-[0.18em] text-muted">{item.label}</dt>
              <dd className="mt-2 text-lg text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
