import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/favicon.svg",
  "assets/tripolaris-logo.png",
  "assets/tripolaris-triangle.png",
  "assets/carta-ca.pdf",
  "assets/carta-es.pdf",
  "assets/carta-en.pdf"
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
  "assets/carta-ca.pdf",
  "assets/carta-es.pdf",
  "assets/carta-en.pdf",
  "script.js"
]) {
  if (!html.includes(text)) {
    throw new Error(`index.html is missing ${text}`);
  }
}

const script = readFileSync(join(root, "script.js"), "utf8");
for (const lang of ["es", "ca", "en"]) {
  if (!script.includes(`${lang}: {`)) {
    throw new Error(`script.js is missing ${lang} translations`);
  }
}

console.log("Static verification passed.");
