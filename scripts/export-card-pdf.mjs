import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFile = process.argv[2] || "card.html";
const outFile = process.argv[3] || "그리다-공간-명함.pdf";
const outPath = path.join(root, outFile);
const pagePath = htmlFile.startsWith("/") ? htmlFile : `/${htmlFile}`;
const chromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const rel = decodeURIComponent(url.pathname);
  const filePath = path.join(root, rel === "/" ? htmlFile : rel);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end();
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": mime[path.extname(filePath)] || "application/octet-stream",
    });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const pageUrl = `http://127.0.0.1:${port}${pagePath}`;

const puppeteer = await import("puppeteer-core");
const browser = await puppeteer.default.launch({
  executablePath: chromePath,
  headless: true,
});

try {
  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outPath,
    width: `${(92 / 25.4).toFixed(6)}in`,
    height: `${(52 / 25.4).toFixed(6)}in`,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const { PDFDocument } = await import("pdf-lib");
  const targetW = (92 / 25.4) * 72;
  const targetH = (52 / 25.4) * 72;
  const pdf = await PDFDocument.load(fs.readFileSync(outPath));
  for (const pdfPage of pdf.getPages()) {
    const { width, height } = pdfPage.getSize();
    pdfPage.setSize(targetW, targetH);
    pdfPage.scaleContent(targetW / width, targetH / height);
  }
  fs.writeFileSync(outPath, await pdf.save());
  console.log(`wrote ${pathToFileURL(outPath)}`);
} finally {
  await browser.close();
  server.close();
}
