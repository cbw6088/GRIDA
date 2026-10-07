/** 합지 폭. 실크는 이음을 그리지 않는다. */
export const rollWidths = {
  "hapji-narrow": 0.53,
  "hapji-wide": 0.93,
  silk: 1.06,
} as const;

export const previewFinishes = [
  {
    id: "hapji-narrow",
    name: "소폭 합지",
    rollWidth: rollWidths["hapji-narrow"],
    seam: "hapji",
    roughness: 0.96,
    clearcoat: 0,
  },
  {
    id: "hapji-wide",
    name: "광폭 합지",
    rollWidth: rollWidths["hapji-wide"],
    seam: "hapji",
    roughness: 0.96,
    clearcoat: 0,
  },
  {
    id: "silk",
    name: "실크",
    rollWidth: rollWidths.silk,
    seam: "silk",
    roughness: 0.42,
    clearcoat: 0.32,
  },
] as const;

export const previewGrains = [
  {
    id: "paint",
    name: "페인트",
    detail: "고르게 칠한 벽의 결",
  },
  {
    id: "plaster",
    name: "회벽",
    detail: "회칠처럼 얼룩진 결",
  },
  {
    id: "fabric",
    name: "패브릭",
    detail: "직물 결과 잔잔한 펄",
  },
] as const;

export const previewDisclaimer =
  "이 화면은 실사가 아닌 모델링 예시입니다. 실제 벽지의 색과 질감과 같지 않을 수 있습니다.";

export const previewColors = [
  { id: "white", name: "화이트", value: "#f7f5f1" },
  { id: "ivory", name: "아이보리", value: "#f4eee4" },
  { id: "sand", name: "샌드", value: "#ead8c4" },
  { id: "clay", name: "클레이", value: "#e0cbb8" },
  { id: "sage", name: "세이지", value: "#d5e0d8" },
  { id: "mist", name: "미스트", value: "#dce3e8" },
  { id: "stone", name: "스톤", value: "#d7d3cc" },
  { id: "greige", name: "그레이지", value: "#cfc6bc" },
] as const;

export const accentModes = [
  { id: "same", name: "같은 벽지" },
  { id: "color", name: "포인트 색" },
] as const;

export const ceilingModes = [
  { id: "same", name: "벽과 같음" },
  { id: "color", name: "색 고르기" },
] as const;

export const previewSpaces = [
  { id: "villa", name: "빌라" },
  { id: "apartment", name: "아파트" },
  { id: "studio", name: "원룸" },
  { id: "office", name: "사무실" },
] as const;

export type PreviewFinishId = (typeof previewFinishes)[number]["id"];
export type PreviewGrainId = (typeof previewGrains)[number]["id"];
export type AccentModeId = (typeof accentModes)[number]["id"];
export type CeilingModeId = (typeof ceilingModes)[number]["id"];
export type PreviewSpaceId = (typeof previewSpaces)[number]["id"];
export type SeamKind = (typeof previewFinishes)[number]["seam"];

export type WallpaperPreviewSelection = {
  spaceId: PreviewSpaceId;
  finishId: PreviewFinishId;
  grainId: PreviewGrainId;
  color: string;
  accent: AccentModeId;
  accentColor: string;
  ceiling: CeilingModeId;
  ceilingColor: string;
};

export const defaultPreviewSelection: WallpaperPreviewSelection = {
  spaceId: "villa",
  finishId: "hapji-wide",
  grainId: "paint",
  color: "#f4eee4",
  accent: "same",
  accentColor: "#d5e0d8",
  ceiling: "same",
  ceilingColor: "#f7f5f1",
};

export function getPreviewFinish(id: PreviewFinishId) {
  return previewFinishes.find((item) => item.id === id) ?? previewFinishes[1];
}

export function getPreviewGrain(id: PreviewGrainId) {
  return previewGrains.find((item) => item.id === id) ?? previewGrains[0];
}

export function getPreviewSpace(id: PreviewSpaceId) {
  return previewSpaces.find((item) => item.id === id) ?? previewSpaces[0];
}
