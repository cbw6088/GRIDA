import type { PreviewGrainId } from "@/lib/wallpaper-preview";

/** 한 타일이 덮는 벽 길이. 무늬가 이 길이마다 자연스럽게 이어진다. */
export const GRAIN_TILE_METERS = 1.25;

const TILE_PX = 1536;

const canvasCache = new Map<string, HTMLCanvasElement>();

function hash(ix: number, iy: number) {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
  n = Math.imul(n ^ (n >> 13), 1274126177);
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function fade(t: number) {
  return t * t * (3 - 2 * t);
}

function wrapIndex(index: number, period: number) {
  const wrapped = index % period;
  return wrapped < 0 ? wrapped + period : wrapped;
}

function noisePeriodic(x: number, y: number, period: number) {
  const cells = Math.max(1, period);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = fade(x - x0);
  const fy = fade(y - y0);
  const a = hash(wrapIndex(x0, cells), wrapIndex(y0, cells));
  const b = hash(wrapIndex(x0 + 1, cells), wrapIndex(y0, cells));
  const c = hash(wrapIndex(x0, cells), wrapIndex(y0 + 1, cells));
  const d = hash(wrapIndex(x0 + 1, cells), wrapIndex(y0 + 1, cells));
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

function fbm(x: number, y: number, frequency: number) {
  let value = 0;
  let amplitude = 0.55;
  let octaveFrequency = frequency;
  for (let octave = 0; octave < 4; octave += 1) {
    const period = Math.round(octaveFrequency * GRAIN_TILE_METERS);
    value += amplitude * noisePeriodic(x * octaveFrequency, y * octaveFrequency, period);
    octaveFrequency *= 2;
    amplitude *= 0.5;
  }
  return value;
}

function grainValue(grain: PreviewGrainId, x: number, y: number) {
  if (grain === "paint") {
    const mist = fbm(x, y, 8);
    const stipple = fbm(x + 1.7, y + 0.4, 48);
    return 246 + (mist - 0.5) * 8 + (stipple - 0.5) * 20;
  }

  if (grain === "plaster") {
    const cloud = fbm(x, y, 8);
    const sand = fbm(x + 0.6, y + 1.1, 32);
    return 240 + (cloud - 0.5) * 20 + (sand - 0.5) * 14;
  }

  const warp = 0.5 + 0.5 * Math.sin(y * Math.PI * 2 * 96);
  const weft = 0.5 + 0.5 * Math.sin(x * Math.PI * 2 * 80);
  const slub = fbm(x, y, 6.4);
  const cell = 80;
  const period = Math.round(cell * GRAIN_TILE_METERS);
  const pearl = hash(
    wrapIndex(Math.floor(x * cell), period),
    wrapIndex(Math.floor(y * cell), period),
  );
  const spark = pearl > 0.988 ? 22 : 0;
  return 242 + (warp - 0.5) * 14 + (weft - 0.5) * 10 + (slub - 0.5) * 8 + spark;
}

function clampByte(value: number) {
  return Math.max(0, Math.min(255, value));
}

export function getGrainCanvas(grain: PreviewGrainId) {
  const cached = canvasCache.get(grain);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = TILE_PX;
  canvas.height = TILE_PX;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const pixels = context.createImageData(TILE_PX, TILE_PX);
  const metersPerPixel = GRAIN_TILE_METERS / TILE_PX;
  for (let y = 0; y < TILE_PX; y += 1) {
    const yMeters = y * metersPerPixel;
    for (let x = 0; x < TILE_PX; x += 1) {
      const value = clampByte(grainValue(grain, x * metersPerPixel, yMeters));
      const index = (y * TILE_PX + x) * 4;
      pixels.data[index] = value;
      pixels.data[index + 1] = value;
      pixels.data[index + 2] = value;
      pixels.data[index + 3] = 255;
    }
  }
  context.putImageData(pixels, 0, 0);

  canvasCache.set(grain, canvas);
  return canvas;
}
