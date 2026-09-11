import { mkdir, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const blurOut = path.join(root, "src/lib/image-blur.ts");

const MAX_EDGE = 1920;
const JPEG_QUALITY = 80;
const LOGO_EDGE = 256;
const WORDMARK_WIDTH = 400;

/** @type {string[]} */
const blurEntries = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

function publicUrl(filePath) {
  const rel = path.relative(publicDir, filePath).split(path.sep).join("/");
  return `/${rel}`.normalize("NFC");
}

function isJpeg(filePath) {
  return /\.jpe?g$/i.test(filePath);
}

function isPng(filePath) {
  return /\.png$/i.test(filePath);
}

async function writeAtomically(filePath, buffer) {
  const tmp = `${filePath}.tmp`;
  await writeFile(tmp, buffer);
  await rename(tmp, filePath);
}

async function optimizeJpeg(filePath) {
  const before = await stat(filePath);
  const image = sharp(filePath).rotate();
  const meta = await image.metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  if (longEdge <= MAX_EDGE && before.size <= 450_000) {
    return { skipped: true, before: before.size, after: before.size };
  }

  const buffer = await image
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();

  await writeAtomically(filePath, buffer);
  return { skipped: false, before: before.size, after: buffer.length };
}

async function convertWallpaperPng(filePath) {
  const before = await stat(filePath);
  const dest = filePath.replace(/\.png$/i, ".jpg");
  const buffer = await sharp(filePath)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();

  await writeAtomically(dest, buffer);
  if (dest !== filePath) {
    await unlink(filePath);
  }

  return { dest, before: before.size, after: buffer.length };
}

async function optimizePng(filePath, maxWidth) {
  const before = await stat(filePath);
  const buffer = await sharp(filePath)
    .rotate()
    .resize({
      width: maxWidth,
      height: maxWidth,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  if (buffer.length >= before.size && (await sharp(filePath).metadata()).width <= maxWidth) {
    return { skipped: true, before: before.size, after: before.size };
  }

  await writeAtomically(filePath, buffer);
  return { skipped: false, before: before.size, after: buffer.length };
}

async function blurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .rotate()
    .resize(16, 16, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

const fallbackBlur = await sharp({
  create: {
    width: 8,
    height: 8,
    channels: 3,
    background: { r: 236, g: 232, b: 224 },
  },
})
  .jpeg({ quality: 40 })
  .toBuffer();

const fallbackBlurURL = `data:image/jpeg;base64,${fallbackBlur.toString("base64")}`;

async function recordBlur(filePath) {
  const url = publicUrl(filePath);
  const dataURL = await blurDataURL(filePath);
  blurEntries.push([url, dataURL]);
}

console.log("Optimizing images…");

const portfolioDir = path.join(publicDir, "portfolio");
const wallpaperDir = path.join(publicDir, "wallpapers");
const bannerDir = path.join(publicDir, "banners");
const brandDir = path.join(publicDir, "brand");

let saved = 0;

for (const filePath of await walk(portfolioDir)) {
  if (!isJpeg(filePath)) continue;
  const result = await optimizeJpeg(filePath);
  saved += result.before - result.after;
  console.log(
    `${result.skipped ? "skip" : "jpeg"} ${publicUrl(filePath)} ${kb(result.before)} → ${kb(result.after)}`,
  );
  await recordBlur(filePath);
}

for (const filePath of await walk(wallpaperDir)) {
  if (isPng(filePath)) {
    const result = await convertWallpaperPng(filePath);
    saved += result.before - result.after;
    console.log(
      `png→jpg ${publicUrl(filePath)} ${kb(result.before)} → ${kb(result.after)}`,
    );
    await recordBlur(result.dest);
    continue;
  }

  if (isJpeg(filePath)) {
    const result = await optimizeJpeg(filePath);
    saved += result.before - result.after;
    console.log(
      `${result.skipped ? "skip" : "jpeg"} ${publicUrl(filePath)} ${kb(result.before)} → ${kb(result.after)}`,
    );
    await recordBlur(filePath);
  }
}

for (const filePath of await walk(bannerDir)) {
  if (!isJpeg(filePath)) continue;
  await recordBlur(filePath);
  console.log(`blur ${publicUrl(filePath)}`);
}

const brandTargets = [
  ["logo.png", LOGO_EDGE],
  ["wordmark-ko.png", WORDMARK_WIDTH],
  ["wordmark-en.png", WORDMARK_WIDTH],
];

for (const [name, maxWidth] of brandTargets) {
  const filePath = path.join(brandDir, name);
  const result = await optimizePng(filePath, maxWidth);
  saved += result.before - result.after;
  console.log(
    `${result.skipped ? "skip" : "png"} ${publicUrl(filePath)} ${kb(result.before)} → ${kb(result.after)}`,
  );
  await recordBlur(filePath);
}

blurEntries.sort(([a], [b]) => a.localeCompare(b, "ko"));

const lines = [
  "/* Generated by scripts/optimize-images.mjs — do not edit by hand. */",
  "",
  "const imageBlurMap: Record<string, string> = {",
  ...blurEntries.map(([url, dataURL]) => `  ${JSON.stringify(url)}: ${JSON.stringify(dataURL)},`),
  "};",
  "",
  `const fallbackBlur = ${JSON.stringify(fallbackBlurURL)};`,
  "",
  "export function getImageBlur(src: string): string {",
  '  const key = src.normalize("NFC");',
  "  return imageBlurMap[key] ?? fallbackBlur;",
  "}",
  "",
];

await mkdir(path.dirname(blurOut), { recursive: true });
await writeFile(blurOut, lines.join("\n"));

console.log(`\nWrote ${blurEntries.length} blur placeholders`);
console.log(`Saved ~${kb(saved)} from source files`);
