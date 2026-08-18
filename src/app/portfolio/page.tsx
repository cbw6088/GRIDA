import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "그리다, 공간 — 시공 포트폴리오",
};

const works = [
  { title: "거실 도배", type: "주거 공간", tone: "bg-soft" },
  { title: "침실 리모델링", type: "주거 공간", tone: "bg-[#ececec]" },
  { title: "상업 공간 마감", type: "상업 공간", tone: "bg-[#e2e2e2]" },
  { title: "부분 보수", type: "유지 보수", tone: "bg-[#f0f0f0]" },
  { title: "패턴 벽지", type: "주거 공간", tone: "bg-[#e8e8e8]" },
  { title: "신축 마감", type: "신축", tone: "bg-[#dedede]" },
];

export default function PortfolioPage() {
  return (
    <main className="px-5 pb-24 pt-28 sm:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm tracking-[0.22em] text-muted">포트폴리오</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          시공 사례
        </h1>
        <div className="mt-6 h-px w-12 bg-foreground" />
        <p className="mt-5 max-w-xl text-pretty break-keep text-muted">
          사진과 프로젝트 설명이 준비되면 이곳에 채워 넣겠습니다.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <li key={work.title} className="group">
              <div className={`relative aspect-[4/5] overflow-hidden ${work.tone}`}>
                <div className="absolute right-5 top-5 h-8 w-8 border border-foreground/15 transition-transform duration-500 group-hover:rotate-45" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs tracking-[0.18em] text-muted">{work.type}</p>
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
    </main>
  );
}
