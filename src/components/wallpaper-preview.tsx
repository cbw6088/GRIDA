"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  accentModes,
  ceilingModes,
  defaultPreviewSelection,
  getPreviewFinish,
  getPreviewGrain,
  previewColors,
  previewFinishes,
  previewDisclaimer,
  previewGrains,
  type WallpaperPreviewSelection,
} from "@/lib/wallpaper-preview";

const WallpaperRoom = dynamic(
  () => import("@/components/wallpaper-room").then((mod) => mod.WallpaperRoom),
  {
    ssr: false,
    loading: () => <RoomPlaceholder label="공간을 불러오는 중" />,
  },
);

function RoomPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-[#f6f3ee] text-sm text-muted">
      {label}
    </div>
  );
}

export function WallpaperPreview() {
  const [selection, setSelection] = useState<WallpaperPreviewSelection>(
    defaultPreviewSelection,
  );
  const [resetSignal, setResetSignal] = useState(0);
  const finish = getPreviewFinish(selection.finishId);
  const grain = getPreviewGrain(selection.grainId);
  const summary = useMemo(() => describeSelection(selection), [selection]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.7fr)] lg:gap-10">
      <div>
        <div
          className="relative h-[min(68vh,620px)] min-h-[420px] overflow-hidden border border-line bg-[#f6f3ee]"
          aria-label={summary}
        >
          <div className="absolute inset-0 touch-none">
            <WallpaperRoom selection={selection} resetSignal={resetSignal} />
          </div>
          <p className="pointer-events-none absolute bottom-3 left-3 text-xs tracking-wide text-foreground/70">
            드래그로 둘러보기 · 스크롤로 확대
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">{summary}</p>
      </div>

      <form
        className="flex flex-col gap-8 border border-line p-5 sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <fieldset>
          <legend className="text-sm tracking-[0.16em] text-muted">벽지</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {previewFinishes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selection.finishId === item.id}
                onClick={() =>
                  setSelection((current) => ({
                    ...current,
                    finishId: item.id,
                  }))
                }
                className={`${choiceClass(selection.finishId === item.id)} h-10`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            {finish.seam === "hapji"
              ? `이음 간격 ${Math.round(finish.rollWidth * 1000)}mm`
              : "이음이 보이지 않습니다"}
          </p>
        </fieldset>

        <fieldset>
          <legend className="text-sm tracking-[0.16em] text-muted">질감</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {previewGrains.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selection.grainId === item.id}
                onClick={() =>
                  setSelection((current) => ({
                    ...current,
                    grainId: item.id,
                  }))
                }
                className={`${choiceClass(selection.grainId === item.id)} h-10`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">{grain.detail}</p>
          <p className="mt-2 text-xs leading-5 text-foreground">{previewDisclaimer}</p>
        </fieldset>

        <fieldset>
          <legend className="text-sm tracking-[0.16em] text-muted">색</legend>
          <ul className="mt-3 grid grid-cols-4 gap-2">
            {previewColors.map((item) => (
              <li key={item.id}>
                <ColorSwatch
                  name={item.name}
                  value={item.value}
                  pressed={selection.color === item.value}
                  onSelect={() =>
                    setSelection((current) => ({ ...current, color: item.value }))
                  }
                />
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-sm tracking-[0.16em] text-muted">정면 벽</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {accentModes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selection.accent === item.id}
                onClick={() =>
                  setSelection((current) => ({
                    ...current,
                    accent: item.id,
                  }))
                }
                className={`${choiceClass(selection.accent === item.id)} h-10`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {selection.accent === "color" ? (
            <ColorChoices
              selected={selection.accentColor}
              onSelect={(value) =>
                setSelection((current) => ({ ...current, accentColor: value }))
              }
            />
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="text-sm tracking-[0.16em] text-muted">천장</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ceilingModes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selection.ceiling === item.id}
                onClick={() =>
                  setSelection((current) => ({
                    ...current,
                    ceiling: item.id,
                  }))
                }
                className={`${choiceClass(selection.ceiling === item.id)} h-10`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {selection.ceiling === "color" ? (
            <ColorChoices
              selected={selection.ceilingColor}
              onSelect={(value) =>
                setSelection((current) => ({ ...current, ceilingColor: value }))
              }
            />
          ) : null}
        </fieldset>

        <button
          type="button"
          onClick={() => setResetSignal((value) => value + 1)}
          className="inline-flex h-10 items-center justify-center border border-line text-sm text-foreground transition-colors hover:border-foreground/30"
        >
          처음 시점
        </button>
      </form>
    </div>
  );
}

function ColorChoices({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ul className="mt-3 grid grid-cols-4 gap-2">
      {previewColors.map((item) => (
        <li key={item.id}>
          <ColorSwatch
            name={item.name}
            value={item.value}
            pressed={selected === item.value}
            onSelect={() => onSelect(item.value)}
          />
        </li>
      ))}
    </ul>
  );
}

function ColorSwatch({
  name,
  value,
  pressed,
  onSelect,
}: {
  name: string;
  value: string;
  pressed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={name}
      onClick={onSelect}
      className="flex w-full flex-col items-center gap-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <span
        className={`h-8 w-full border ${pressed ? "border-foreground" : "border-line"}`}
        style={{ backgroundColor: value }}
      />
      <span className={`text-[11px] ${pressed ? "text-foreground" : "text-muted"}`}>
        {name}
      </span>
    </button>
  );
}

function choiceClass(selected: boolean) {
  return `inline-flex items-center justify-center border px-2 text-sm transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
    selected
      ? "border-foreground text-foreground"
      : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
  }`;
}

function describeSelection(selection: WallpaperPreviewSelection) {
  const finish = getPreviewFinish(selection.finishId);
  const grain = getPreviewGrain(selection.grainId);
  const color =
    previewColors.find((item) => item.value === selection.color)?.name ?? "선택 색";
  const accent = colorName(selection.accent === "color" ? selection.accentColor : "");
  const ceiling = colorName(selection.ceiling === "color" ? selection.ceilingColor : "");
  return `${finish.name} · ${grain.name} · ${color} · 정면 ${accent || "같은 벽지"} · 천장 ${ceiling || "벽과 같음"}`;
}

function colorName(value: string) {
  if (!value) return "";
  return previewColors.find((item) => item.value === value)?.name ?? "선택 색";
}
