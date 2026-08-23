import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const requiredFiles = [
  "index.html",
  "qr/index.html",
  "styles.css",
  "script.js",
  "pdf-viewer.mjs",
  "assets/favicon.svg",
  "assets/tripolaris-logo.png",
  "assets/tripolaris-triangle.png",
  "assets/about-mixologia.jpg",
  "assets/about-musica.jpg",
  "assets/about-cultura.jpg",
  "assets/qr/tripolaris-home.svg",
  "assets/carta-pages/es/page-01.jpg",
  "assets/carta-pages/ca/page-01.jpg",
  "assets/carta-pages/en/page-01.jpg"
];

for (const file of requiredFiles) {
  const path = join(root, file);
  const stat = statSync(path);
  if (!stat.isFile() || stat.size === 0) {
    throw new Error(`${file} is missing or empty`);
  }
}

const html = readFileSync(join(root, "index.html"), "utf8");
for (const text of [
  "Tripolaris",
  "assets/tripolaris-logo.png",
  "assets/tripolaris-triangle.png",
  "assets/about-mixologia.jpg",
  "assets/about-musica.jpg",
  "assets/about-cultura.jpg",
  "assets/carta-pages/es/page-01.jpg?v=20260823-5",
  "assets/carta-pages/ca/page-01.jpg?v=20260823-5",
  "assets/carta-pages/en/page-01.jpg?v=20260823-5",
  "data-page-pattern=\"assets/carta-pages/es/page-{page}.jpg?v=20260823-5\"",
  "data-page-pattern=\"assets/carta-pages/ca/page-{page}.jpg?v=20260823-5\"",
  "data-page-pattern=\"assets/carta-pages/en/page-{page}.jpg?v=20260823-5\"",
  "data-page-count=\"27\"",
  "id=\"menu-pdf-viewer\"",
  "id=\"menu-pdf-pages\"",
  "aria-label=\"Carta PDF\"",
  "data-pdf-link",
  "data-pdf-loading-text",
  "script.js",
  "pdf-viewer.mjs?v=20260823-3"
]) {
  if (!html.includes(text)) {
    throw new Error(`index.html is missing ${text}`);
  }
}

const qrHtml = readFileSync(join(root, "qr/index.html"), "utf8");
for (const text of [
  "https://tripolarisbarcelona.com",
  "../assets/qr/tripolaris-home.svg",
  "../assets/tripolaris-logo.png",
  "../styles.css?v=20260823-2",
  "QR para abrir https://tripolarisbarcelona.com"
]) {
  if (!qrHtml.includes(text)) {
    throw new Error(`qr/index.html is missing ${text}`);
  }
}

const script = readFileSync(join(root, "script.js"), "utf8");
for (const lang of ["es", "ca", "en"]) {
  if (!script.includes(`${lang}: {`)) {
    throw new Error(`script.js is missing ${lang} translations`);
  }
}

const pdfViewer = readFileSync(join(root, "pdf-viewer.mjs"), "utf8");
for (const text of ["pdfLoading", "pdfError", "pagePattern", "menu-page-image", "pageNumber", "data-pdf-link"]) {
  if (!pdfViewer.includes(text)) {
    throw new Error(`pdf-viewer.mjs is missing ${text}`);
  }
}

const styles = readFileSync(join(root, "styles.css"), "utf8");
for (const text of ["100dvh - 9rem", "100dvh - 10.3rem", "object-fit: contain"]) {
  if (!styles.includes(text)) {
    throw new Error(`styles.css is missing fitted menu image rule ${text}`);
  }
}

const jpegSize = (path) => {
  const data = readFileSync(path);
  let offset = 2;
  while (offset < data.length) {
    if (data[offset] !== 0xff) break;
    const marker = data[offset + 1];
    const length = data.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: data.readUInt16BE(offset + 7),
        height: data.readUInt16BE(offset + 5)
      };
    }
    offset += 2 + length;
  }
  throw new Error(`${path} has no readable JPEG dimensions`);
};

for (const language of ["es", "ca", "en"]) {
  const languagePath = join(root, "assets/carta-pages", language);
  const pageFiles = readdirSync(languagePath).filter((file) => file.endsWith(".jpg"));
  if (pageFiles.length !== 27) {
    throw new Error(`assets/carta-pages/${language} should contain 27 JPG pages, found ${pageFiles.length}`);
  }
  for (const pageFile of pageFiles) {
    const size = jpegSize(join(languagePath, pageFile));
    if (size.width !== 870 || size.height !== 1238) {
      throw new Error(`assets/carta-pages/${language}/${pageFile} should be 870x1238, found ${size.width}x${size.height}`);
    }
  }
}

console.log("Static verification passed.");
