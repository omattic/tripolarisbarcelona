import { readFileSync, statSync } from "node:fs";
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
  "assets/carta-ca.pdf",
  "assets/carta-es.pdf",
  "assets/carta-en.pdf",
  "assets/pdfjs/pdf.mjs",
  "assets/pdfjs/pdf.worker.mjs"
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
  "assets/carta-ca.pdf",
  "assets/carta-es.pdf",
  "assets/carta-en.pdf",
  "id=\"menu-pdf-viewer\"",
  "id=\"menu-pdf-pages\"",
  "aria-label=\"Carta PDF\"",
  "aria-label=\"Descargar carta\"",
  "download=\"carta-es.pdf\"",
  "data-pdf-link",
  "data-pdf-loading-text",
  "script.js",
  "pdf-viewer.mjs"
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
for (const text of ["pdfLoading", "pdfError", "pdfjsLib", "data-pdf-link", "renderPage", "setAttribute(\"download\""]) {
  if (!pdfViewer.includes(text)) {
    throw new Error(`pdf-viewer.mjs is missing ${text}`);
  }
}

console.log("Static verification passed.");
