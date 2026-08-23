const viewer = document.querySelector("#menu-pdf-viewer");
const pages = document.querySelector("#menu-pdf-pages");
const title = document.querySelector("#menu-pdf-title");
const loader = document.querySelector(".pdf-loader");
const loadingText = document.querySelector("[data-pdf-loading-text]");
const openLink = document.querySelector(".pdf-open-link");
const closeButton = document.querySelector("[data-pdf-close]");
const pdfLinks = document.querySelectorAll("[data-pdf-link]");
const pdfStage = document.querySelector(".pdf-stage");

let activeLink = null;
let renderToken = 0;
let pdfjsLibPromise = null;
let activeObserver = null;
let activePdf = null;
let activePdfBlobUrl = null;

const installPdfPolyfills = () => {
  if (typeof Promise.withResolvers !== "function") {
    Promise.withResolvers = () => {
      let resolve;
      let reject;
      const promise = new Promise((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
      });
      return { promise, resolve, reject };
    };
  }

  if (typeof Promise.try !== "function") {
    Promise.try = (callback, ...args) => {
      try {
        return Promise.resolve(callback(...args));
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
};

const loadPdfJs = async () => {
  installPdfPolyfills();
  pdfjsLibPromise ||= import("./assets/pdfjs/pdf.mjs").then((module) => {
    return import("./assets/pdfjs/pdf.worker.mjs").then((workerModule) => {
      globalThis.pdfjsWorker = workerModule;
      module.GlobalWorkerOptions.workerSrc = "./assets/pdfjs/pdf.worker.mjs";
      return module;
    });
  });
  return pdfjsLibPromise;
};

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

const revokePdfBlobUrl = () => {
  if (activePdfBlobUrl) {
    URL.revokeObjectURL(activePdfBlobUrl);
    activePdfBlobUrl = null;
  }
};

const closeViewer = () => {
  renderToken += 1;
  activeObserver?.disconnect();
  activeObserver = null;
  activePdf?.destroy?.();
  activePdf = null;
  revokePdfBlobUrl();
  if (viewer) {
    viewer.hidden = true;
  }
  document.body.classList.remove("pdf-open");
};

const shouldUseNativePdfFallback = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

const showPdfFallback = (pdfBytes, pdfUrl, token) => {
  if (token !== renderToken || !pages) return;

  activeObserver?.disconnect();
  activeObserver = null;
  activePdf?.destroy?.();
  activePdf = null;
  revokePdfBlobUrl();

  activePdfBlobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));

  const pageShell = document.createElement("article");
  pageShell.className = "pdf-page pdf-fallback-page";

  const frame = document.createElement("iframe");
  frame.className = "pdf-fallback-frame";
  frame.src = activePdfBlobUrl;
  frame.title = pdfUrl.split("/").pop() || "Tripolaris carta PDF";
  frame.addEventListener("load", () => {
    if (token === renderToken) {
      hideLoading();
    }
  }, { once: true });

  pageShell.append(frame);
  pages.replaceChildren(pageShell);
  window.setTimeout(() => {
    if (token === renderToken && pages.contains(frame)) {
      hideLoading();
    }
  }, 1200);
};

const canvasPixelRatio = () => {
  const dpr = window.devicePixelRatio || 1;
  return Math.min(dpr, window.innerWidth <= 700 ? 1.5 : 2);
};

const pageWidth = () => Math.max(280, Math.min((pages?.clientWidth || 0) - 32, 1100));

const pageViewportForWidth = (page, width) => {
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = width / baseViewport.width;
  return page.getViewport({ scale });
};

const buildPageShell = (pageNumber, viewport) => {
  const pageShell = document.createElement("article");
  pageShell.className = "pdf-page is-pending";
  pageShell.dataset.page = String(pageNumber);
  pageShell.style.minHeight = `${Math.floor(viewport.height)}px`;
  return pageShell;
};

const renderPage = async (pdf, pageNumber, token, pageShell) => {
  if (!pageShell || pageShell.dataset.rendered === "true" || pageShell.dataset.rendering === "true") {
    return;
  }
  pageShell.dataset.rendering = "true";

  const page = await pdf.getPage(pageNumber);
  if (token !== renderToken || !pages) return;

  const viewport = pageViewportForWidth(page, pageWidth());
  const dpr = canvasPixelRatio();

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width * dpr);
  canvas.height = Math.floor(viewport.height * dpr);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  pageShell.replaceChildren(canvas);
  pageShell.classList.remove("is-pending");
  pageShell.style.minHeight = "";

  await page.render({
    canvasContext: canvas.getContext("2d"),
    viewport,
    transform: dpr === 1 ? null : [dpr, 0, 0, dpr, 0, 0]
  }).promise;

  pageShell.dataset.rendered = "true";
  pageShell.dataset.rendering = "false";
};

const setupLazyRendering = async (pdf, token) => {
  const firstPage = await pdf.getPage(1);
  if (token !== renderToken || !pages) return;

  const firstViewport = pageViewportForWidth(firstPage, pageWidth());
  const aspectRatio = firstViewport.height / firstViewport.width;
  const shells = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const shell = buildPageShell(pageNumber, {
      height: pageWidth() * aspectRatio
    });
    pages.append(shell);
    shells.push(shell);
  }

  try {
    await renderPage(pdf, 1, token, shells[0]);
    if (token === renderToken) {
      hideLoading();
    }
  } catch (error) {
    console.error("Failed to render first PDF page", error);
    throw error;
  }

  if (!("IntersectionObserver" in window)) {
    for (const shell of shells.slice(1)) {
      if (token !== renderToken) return;
      await renderPage(pdf, Number(shell.dataset.page), token, shell);
    }
    return;
  }

  activeObserver?.disconnect();
  activeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      activeObserver?.unobserve(entry.target);
      renderPage(pdf, Number(entry.target.dataset.page), token, entry.target).catch((error) => {
        console.error("Failed to render PDF page", error);
      });
    }
  }, {
    root: pdfStage || null,
    rootMargin: "900px 0px"
  });

  for (const shell of shells.slice(1)) {
    activeObserver.observe(shell);
  }
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

  let pdfBytes = null;
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`PDF request failed with ${response.status}`);
    }

    pdfBytes = await response.arrayBuffer();
    if (token !== renderToken) return;

    if (shouldUseNativePdfFallback()) {
      showPdfFallback(pdfBytes, pdfUrl, token);
      return;
    }

    const pdfjsLib = await loadPdfJs();
    activePdf?.destroy?.();
    const pdf = await pdfjsLib.getDocument({
      data: pdfBytes,
      isOffscreenCanvasSupported: false
    }).promise;
    activePdf = pdf;
    if (token !== renderToken) return;

    await setupLazyRendering(pdf, token);
  } catch (error) {
    console.error("Failed to load PDF", error);
    if (token === renderToken) {
      if (pdfBytes) {
        showPdfFallback(pdfBytes, pdfUrl, token);
      } else {
        setError(dictionary().pdfError || "Could not load the menu");
      }
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
