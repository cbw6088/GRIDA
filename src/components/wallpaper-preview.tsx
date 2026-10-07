"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type ReactNode } from "react";
import {
  accentModes,
  ceilingModes,
  defaultPreviewSelection,
  getPreviewFinish,
  getPreviewGrain,
  getPreviewSpace,
  previewColors,
  previewFinishes,
  previewDisclaimer,
  previewGrains,
  previewSpaces,
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

const roomHeight =
  "h-[min(40dvh,420px)] min-h-[220px] lg:h-[min(68vh,620px)] lg:min-h-[420px]";
const settingsHeight = "lg:h-[min(68vh,620px)] lg:min-h-[420px]";

export function WallpaperPreview() {
  const [selection, setSelection] = useState<WallpaperPreviewSelection>(
    defaultPreviewSelection,
  );
  const [resetSignal, setResetSignal] = useState(0);
  const space = getPreviewSpace(selection.spaceId);
  const finish = getPreviewFinish(selection.finishId);
  const grain = getPreviewGrain(selection.grainId);
  const summary = useMemo(() => describeSelection(selection), [selection]);
  const accentLabel =
    selection.accent === "color" ? colorName(selection.accentColor) : "같은 벽지";
  const ceilingLabel =
    selection.ceiling === "color" ? colorName(selection.ceilingColor) : "벽과 같음";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.7fr)] lg:gap-10">
      <div className="sticky top-[4.5rem] z-20 self-start bg-background pb-4 lg:static lg:z-auto lg:pb-0">
        <div
          className={`relative overflow-hidden border border-line bg-[#f6f3ee] ${roomHeight}`}
          aria-label={summary}
        >
          <div className="absolute inset-0 touch-none">
            <WallpaperRoom
              key={selection.spaceId}
              selection={selection}
              resetSignal={resetSignal}
            />
          </div>
          <p className="pointer-events-none absolute bottom-3 left-3 text-xs tracking-wide text-foreground/70">
            <span className="lg:hidden">한 손가락으로 둘러보기 · 두 손가락으로 확대</span>
            <span className="hidden lg:inline">드래그로 둘러보기 · 스크롤로 확대</span>
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">{summary}</p>
      </div>

      <form
        className={`flex flex-col border border-line lg:overflow-hidden ${settingsHeight}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
          <SettingSection title="공간" value={space.name}>
            <div className="grid grid-cols-2 gap-2">
              {previewSpaces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selection.spaceId === item.id}
                  onClick={() =>
                    setSelection((current) => ({
                      ...current,
                      spaceId: item.id,
                    }))
                  }
                  className={`${choiceClass(selection.spaceId === item.id)} h-10`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </SettingSection>

          <SettingSection title="벽지" value={finish.name}>
            <div className="grid grid-cols-3 gap-2">
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
          </SettingSection>

          <SettingSection title="질감" value={grain.name}>
            <div className="grid grid-cols-3 gap-2">
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
          </SettingSection>

          <SettingSection title="색" value={colorName(selection.color)}>
            <ColorChoices
              selected={selection.color}
              onSelect={(value) =>
                setSelection((current) => ({ ...current, color: value }))
              }
            />
          </SettingSection>

          <SettingSection title="정면 벽" value={accentLabel}>
            <div className="grid grid-cols-2 gap-2">
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
                className="mt-3"
                selected={selection.accentColor}
                onSelect={(value) =>
                  setSelection((current) => ({ ...current, accentColor: value }))
                }
              />
            ) : null}
          </SettingSection>

          <SettingSection title="천장" value={ceilingLabel}>
            <div className="grid grid-cols-2 gap-2">
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
                className="mt-3"
                selected={selection.ceilingColor}
                onSelect={(value) =>
                  setSelection((current) => ({ ...current, ceilingColor: value }))
                }
              />
            ) : null}
          </SettingSection>

          <p className="px-5 py-4 text-xs leading-5 text-foreground">{previewDisclaimer}</p>
        </div>

        <div className="border-t border-line p-4">
          <button
            type="button"
            onClick={() => setResetSignal((value) => value + 1)}
            className="inline-flex h-10 w-full items-center justify-center border border-line text-sm text-foreground transition-colors hover:border-foreground/30"
          >
            처음 시점
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingSection({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center gap-3 px-5 py-3.5 text-left"
      >
        <span className="text-sm tracking-[0.16em] text-muted">{title}</span>
        <span className="ml-auto truncate text-sm text-foreground">{value}</span>
        <span
          aria-hidden
          className={`h-1.5 w-1.5 shrink-0 border-b border-r border-foreground/70 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "-translate-y-px rotate-[225deg]" : "rotate-45"
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 pb-4 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorChoices({
  selected,
  onSelect,
  className = "",
}: {
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-4 gap-2 ${className}`}>
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
  const space = getPreviewSpace(selection.spaceId);
  const finish = getPreviewFinish(selection.finishId);
  const grain = getPreviewGrain(selection.grainId);
  const color =
    previewColors.find((item) => item.value === selection.color)?.name ?? "선택 색";
  const accent = colorName(selection.accent === "color" ? selection.accentColor : "");
  const ceiling = colorName(selection.ceiling === "color" ? selection.ceilingColor : "");
  return `${space.name} · ${finish.name} · ${grain.name} · ${color} · 정면 ${accent || "같은 벽지"} · 천장 ${ceiling || "벽과 같음"}`;
}

function colorName(value: string) {
  if (!value) return "";
  return previewColors.find((item) => item.value === value)?.name ?? "선택 색";
}
