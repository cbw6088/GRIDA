export function HeroGeometry() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="animate-orb-breathe absolute -right-[8%] top-[8%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "rgba(var(--shape-sage), 0.28)" }}
      />
      <div
        className="animate-soft-pulse absolute -left-[10%] bottom-[5%] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: "rgba(var(--shape-slate), 0.22)" }}
      />
      <div
        className="animate-orb-breathe absolute right-[28%] bottom-[12%] h-56 w-56 rounded-full blur-2xl"
        style={{
          background: "rgba(var(--shape-clay), 0.24)",
          animationDelay: "-3s",
        }}
      />

      <div className="animate-reveal-1 absolute right-[-3%] top-[16%] h-72 w-72 sm:right-[6%] sm:top-[18%] sm:h-[26rem] sm:w-[26rem]">
        <div className="animate-drift-y h-full w-full">
          <div
            className="animate-ring-spin absolute inset-0 rounded-full border"
            style={{ borderColor: "rgba(var(--shape-sage), 0.45)" }}
          />
          <div
            className="absolute inset-8 rounded-full"
            style={{ background: "rgba(var(--shape-sage), 0.12)" }}
          />
          <div
            className="absolute inset-[22%] rounded-full border border-dashed"
            style={{ borderColor: "rgba(var(--shape-mist), 0.55)" }}
          />
        </div>
      </div>

      <div className="animate-reveal-2 absolute right-[8%] top-[46%] hidden h-44 w-44 sm:block md:right-[16%]">
        <div
          className="animate-drift-xy h-full w-full"
          style={{ background: "rgba(var(--shape-clay), 0.34)" }}
        />
      </div>

      <div className="animate-reveal-3 absolute bottom-[20%] right-[30%] hidden h-28 w-28 sm:block">
        <div
          className="animate-drift-spin h-full w-full border"
          style={{
            borderColor: "rgba(var(--shape-slate), 0.55)",
            background: "rgba(var(--shape-slate), 0.12)",
          }}
        />
      </div>

      <div
        className="animate-reveal-2 absolute left-[7%] top-[28%] h-3.5 w-3.5 rounded-full"
        style={{ background: "rgba(var(--shape-clay), 0.85)" }}
      />
      <div
        className="animate-draw-line absolute left-[11%] top-[29.2%] h-px w-20 sm:w-28"
        style={{ background: "rgba(var(--shape-mist), 0.9)" }}
      />

      <div className="animate-reveal-4 absolute bottom-[24%] left-[8%] h-20 w-20">
        <div
          className="animate-drift-y h-full w-full rotate-12"
          style={{ background: "rgba(var(--shape-sand), 0.38)" }}
        />
      </div>

      <div
        className="animate-reveal-3 absolute right-[14%] top-[14%] h-2.5 w-2.5 rounded-full"
        style={{ background: "rgba(var(--shape-slate), 0.75)" }}
      />

      <div className="animate-reveal-4 absolute left-[42%] top-[18%] hidden h-16 w-16 md:block">
        <div
          className="animate-drift-xy h-full w-full rounded-full border"
          style={{
            borderColor: "rgba(var(--shape-clay), 0.4)",
            background: "rgba(var(--shape-clay), 0.08)",
            animationDelay: "-2.5s",
          }}
        />
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 hidden h-36 w-full md:block"
        viewBox="0 0 1200 144"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="animate-dash-flow"
          d="M0 108 C180 40, 320 128, 480 72 S780 24, 960 88 S1120 40, 1200 64"
          stroke="rgba(132, 148, 168, 0.45)"
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d="M0 120 C220 70, 380 130, 560 96 S860 50, 1200 110"
          stroke="rgba(188, 160, 138, 0.28)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
