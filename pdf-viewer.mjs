import * as pdfjsLib from "./assets/pdfjs/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./assets/pdfjs/pdf.worker.mjs";

const viewer = document.querySelector("#menu-pdf-viewer");
const pages = document.querySelector("#menu-pdf-pages");
const title = document.querySelector("#menu-pdf-title");
const loader = document.querySelector(".pdf-loader");
const loadingText = document.querySelector("[data-pdf-loading-text]");
const openLink = document.querySelector(".pdf-open-link");
const closeButton = document.querySelector("[data-pdf-close]");
const pdfLinks = document.querySelectorAll("[data-pdf-link]");

let activeLink = null;
let renderToken = 0;

const dictionary = () => {
  const language = document.documentElement.lang;
  const dictionaries = window.tripolarisTranslations || {};
  return dictionaries[language] || dictionaries.es || {};
};

const setTitle = () => {
  if (activeLink && title) {
    title.textContent = activeLink.textContent.trim();
  }
};

const setLoading = (message) => {
  if (loader) {
    loader.classList.add("is-visible");
    loader.classList.remove("is-error");
  }
  if (loadingText) {
    loadingText.textContent = message;
  }
};

const setError = (message) => {
  if (loader) {
    loader.classList.add("is-visible", "is-error");
  }
  if (loadingText) {
    loadingText.textContent = message;
  }
};

const hideLoading = () => {
  loader?.classList.remove("is-visible", "is-error");
};

const closeViewer = () => {
  renderToken += 1;
  if (viewer) {
    viewer.hidden = true;
  }
  document.body.classList.remove("pdf-open");
};

const renderPage = async (pdf, pageNumber, token) => {
  const page = await pdf.getPage(pageNumber);
  if (token !== renderToken || !pages) return;

  const baseViewport = page.getViewport({ scale: 1 });
  const availableWidth = Math.max(280, Math.min(pages.clientWidth - 32, 1100));
  const scale = availableWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });
  const dpr = window.devicePixelRatio || 1;

  const pageShell = document.createElement("article");
  pageShell.className = "pdf-page";

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width * dpr);
  canvas.height = Math.floor(viewport.height * dpr);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  pageShell.append(canvas);
  pages.append(pageShell);

  await page.render({
    canvasContext: canvas.getContext("2d"),
    viewport,
    transform: dpr === 1 ? null : [dpr, 0, 0, dpr, 0, 0]
  }).promise;
};

const openViewer = async (link) => {
  const pdfUrl = link.getAttribute("href");
  if (!pdfUrl || !viewer || !pages || !openLink) return;

  const token = ++renderToken;
  activeLink = link;
  pdfLinks.forEach((item) => item.classList.toggle("active", item === link));
  setTitle();

  viewer.hidden = false;
  document.body.classList.add("pdf-open");
  pages.replaceChildren();
  openLink.setAttribute("href", pdfUrl);
  openLink.setAttribute("download", pdfUrl.split("/").pop() || "tripolaris-carta.pdf");
  setLoading(dictionary().pdfLoading || "Loading menu...");
  closeButton?.focus();

  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`PDF request failed with ${response.status}`);
    }

    const pdfBytes = await response.arrayBuffer();
    if (token !== renderToken) return;

    const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
    if (token !== renderToken) return;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      await renderPage(pdf, pageNumber, token);
    }

    if (token === renderToken) {
      hideLoading();
    }
  } catch {
    if (token === renderToken) {
      setError(dictionary().pdfError || "Could not load the menu");
    }
  }
};

pdfLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openViewer(link);
  });
});

closeButton?.addEventListener("click", closeViewer);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && viewer && !viewer.hidden) {
    closeViewer();
  }
});

window.addEventListener("tripolaris:languagechange", () => {
  setTitle();
  if (loader?.classList.contains("is-visible") && !loader.classList.contains("is-error")) {
    setLoading(dictionary().pdfLoading || "Loading menu...");
  }
});
