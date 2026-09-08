const viewer = document.querySelector("#menu-pdf-viewer");
const pages = document.querySelector("#menu-pdf-pages");
const title = document.querySelector("#menu-pdf-title");
const loader = document.querySelector(".pdf-loader");
const loadingText = document.querySelector("[data-pdf-loading-text]");
const closeButton = document.querySelector("[data-pdf-close]");
const downloadLink = document.querySelector("[data-pdf-download-link]");
const menuLinks = document.querySelectorAll("[data-pdf-link]");

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
  const closeHome = closeButton?.dataset.pdfCloseHome;
  if (closeHome) {
    window.location.href = closeHome;
    return;
  }
  if (/\/carta\/(es|ca|en)\/?$/.test(window.location.pathname) && window.history?.pushState) {
    window.history.pushState(null, "", new URL("../../", window.location.href).pathname);
  }
  if (viewer) {
    viewer.hidden = true;
  }
  document.body.classList.remove("pdf-open");
};

const pageNumber = (value) => String(value).padStart(2, "0");

const pageUrl = (pattern, number) => pattern.replace("{page}", pageNumber(number));

const absoluteUrl = (value) => new URL(value, window.location.href).href;

const setDownloadLink = (link) => {
  if (!downloadLink) return;
  const downloadUrl = link.dataset.pdfDownload;
  if (!downloadUrl) {
    downloadLink.hidden = true;
    downloadLink.removeAttribute("href");
    return;
  }
  downloadLink.hidden = false;
  downloadLink.href = absoluteUrl(downloadUrl);
  downloadLink.download = downloadUrl.split("/").pop() || "tripolaris-carta.pdf";
};

const buildPageImage = (pattern, number, token, onFirstPageLoaded) => {
  const pageShell = document.createElement("article");
  pageShell.className = "pdf-page menu-image-page";

  const image = document.createElement("img");
  image.className = "menu-page-image";
  image.alt = `${activeLink?.textContent.trim() || "Carta"} pagina ${number}`;
  image.decoding = "async";
  image.loading = number <= 2 ? "eager" : "lazy";
  image.addEventListener("load", () => {
    if (token === renderToken) {
      onFirstPageLoaded();
    }
  }, { once: true });
  image.addEventListener("error", () => {
    if (token === renderToken && number === 1) {
      setError(dictionary().pdfError || "Could not load the menu");
    }
  }, { once: true });
  image.src = absoluteUrl(pageUrl(pattern, number));

  pageShell.append(image);
  return pageShell;
};

const openViewer = (link) => {
  const pattern = link.dataset.pagePattern;
  const pageCount = Number(link.dataset.pageCount || 0);
  if (!pattern || !pageCount || !viewer || !pages) return;

  const token = ++renderToken;
  let firstPageLoaded = false;
  const onFirstPageLoaded = () => {
    if (!firstPageLoaded) {
      firstPageLoaded = true;
      hideLoading();
    }
  };

  activeLink = link;
  menuLinks.forEach((item) => item.classList.toggle("active", item === link));
  setTitle();
  setDownloadLink(link);

  viewer.hidden = false;
  document.body.classList.add("pdf-open");
  pages.replaceChildren();
  setLoading(dictionary().pdfLoading || "Loading menu...");
  closeButton?.focus();

  const fragment = document.createDocumentFragment();
  for (let number = 1; number <= pageCount; number += 1) {
    fragment.append(buildPageImage(pattern, number, token, onFirstPageLoaded));
  }
  pages.append(fragment);
};

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openViewer(link);
    if (link.href && window.history?.pushState) {
      window.history.pushState({ carta: link.dataset.cartaLanguage || "" }, "", link.href);
    }
  });
});

document.querySelector("[data-pdf-auto-open]")?.click();

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
