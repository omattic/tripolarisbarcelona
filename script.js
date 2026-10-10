const translations = {
  es: {
    navAbout: "Sobre Nosotros",
    navGallery: "Galería",
    navMenu: "La Carta",
    navContact: "Contacto",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Coctelería de autor en Les Corts, Barcelona",
    heroCta: "Ver la Carta",
    aboutEyebrow: "Sobre Nosotros",
    aboutTitle: "Un bar con tres almas",
    aboutText:
      "Tripolaris, porque representa a 3 amigos. La polaridad indica la distribución desigual de las cargas eléctricas, algo que representa nuestras personalidades. También puede referirse a la estrella del norte llamada Polaris, la estrella más brillante del hemisferio norte de la Tierra.",
    featureOneTitle: "Mixología",
    featureOneText: "Cócteles creativos preparados con técnica, color y personalidad.",
    featureTwoTitle: "Música en Vivo",
    featureTwoText: "Sesiones y noches culturales para quedarse un rato más.",
    featureThreeTitle: "Cultura",
    featureThreeText: "Un punto de encuentro cercano en el barrio de Les Corts.",
    galleryEyebrow: "Momentos Tripolaris",
    galleryTitle: "Galería",
    carouselPrevious: "Foto anterior",
    carouselNext: "Foto siguiente",
    photoAlt: "Tripolaris Barcelona, octubre de 2026, foto",
    menuEyebrow: "La Carta",
    menuTitle: "Carta digital",
    menuSpanish: "Español",
    menuCatalan: "Català",
    menuEnglish: "English",
    pdfLoading: "Cargando carta...",
    pdfError: "No se pudo cargar la carta",
    contactEyebrow: "Contacto",
    contactTitle: "Visítanos en Les Corts",
    maps: "Google Maps",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Cerrado"
  },
  ca: {
    navAbout: "Sobre Nosaltres",
    navGallery: "Galeria",
    navMenu: "La Carta",
    navContact: "Contacte",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Cocteleria d’autor a Les Corts, Barcelona",
    heroCta: "Veure la Carta",
    aboutEyebrow: "Sobre Nosaltres",
    aboutTitle: "Un bar amb tres ànimes",
    aboutText:
      "Tripolaris, perquè representa 3 amics. La polaritat indica la distribució desigual de les càrregues elèctriques, una cosa que representa les nostres personalitats. També pot referir-se a l’estrella del nord anomenada Polaris, l’estrella més brillant de l’hemisferi nord de la Terra.",
    featureOneTitle: "Mixologia",
    featureOneText: "Còctels creatius preparats amb tècnica, color i personalitat.",
    featureTwoTitle: "Música en Viu",
    featureTwoText: "Sessions i nits culturals per quedar-se una estona més.",
    featureThreeTitle: "Cultura",
    featureThreeText: "Un punt de trobada proper al barri de Les Corts.",
    galleryEyebrow: "Moments Tripolaris",
    galleryTitle: "Galeria",
    carouselPrevious: "Foto anterior",
    carouselNext: "Foto següent",
    photoAlt: "Tripolaris Barcelona, octubre de 2026, foto",
    menuEyebrow: "La Carta",
    menuTitle: "Carta digital",
    menuSpanish: "Espanyol",
    menuCatalan: "Català",
    menuEnglish: "English",
    pdfLoading: "Carregant carta...",
    pdfError: "No s'ha pogut carregar la carta",
    contactEyebrow: "Contacte",
    contactTitle: "Visita'ns a Les Corts",
    maps: "Google Maps",
    monday: "Dilluns",
    tuesday: "Dimarts",
    wednesday: "Dimecres",
    thursday: "Dijous",
    friday: "Divendres",
    saturday: "Dissabte",
    sunday: "Diumenge",
    closed: "Tancat"
  },
  en: {
    navAbout: "About Us",
    navGallery: "Gallery",
    navMenu: "Menu",
    navContact: "Contact",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Signature cocktails in Les Corts, Barcelona",
    heroCta: "See the Menu",
    aboutEyebrow: "About Us",
    aboutTitle: "A bar with three souls",
    aboutText:
      "Tripolaris, because it represents 3 friends. Polarity describes the uneven distribution of electric charges, something that represents our personalities. It can also refer to the northern star called Polaris, the brightest star in Earth's northern hemisphere.",
    featureOneTitle: "Mixology",
    featureOneText: "Creative cocktails prepared with technique, color, and personality.",
    featureTwoTitle: "Live Music",
    featureTwoText: "Sessions and cultural nights made for staying a little longer.",
    featureThreeTitle: "Culture",
    featureThreeText: "A welcoming meeting point in the Les Corts neighborhood.",
    galleryEyebrow: "Tripolaris moments",
    galleryTitle: "Gallery",
    carouselPrevious: "Previous photo",
    carouselNext: "Next photo",
    photoAlt: "Tripolaris Barcelona, October 2026, photo",
    menuEyebrow: "Menu",
    menuTitle: "Digital menu",
    menuSpanish: "Spanish",
    menuCatalan: "Catalan",
    menuEnglish: "English",
    pdfLoading: "Loading menu...",
    pdfError: "Could not load the menu",
    contactEyebrow: "Contact",
    contactTitle: "Visit us in Les Corts",
    maps: "Google Maps",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed"
  }
};

const applyLanguage = (language) => {
  const dictionary = translations[language] || translations.es;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria-label");
    if (dictionary[key]) {
      element.setAttribute("aria-label", dictionary[key]);
    }
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
  window.dispatchEvent(new CustomEvent("tripolaris:languagechange", { detail: { language } }));
};

window.tripolarisTranslations = translations;

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const fedraPhotos = [
  "TRIPOLARIS_OCT26-1.jpg",
  "TRIPOLARIS_OCT26-2.jpg",
  "TRIPOLARIS_OCT26-6.jpg",
  "TRIPOLARIS_OCT26-12.jpg",
  "TRIPOLARIS_OCT26-13.jpg",
  "TRIPOLARIS_OCT26-17.jpg",
  "TRIPOLARIS_OCT26-19.jpg",
  "TRIPOLARIS_OCT26-26.jpg",
  "TRIPOLARIS_OCT26-28.jpg",
  "TRIPOLARIS_OCT26-29.jpg",
  "TRIPOLARIS_OCT26-34.jpg",
  "TRIPOLARIS_OCT26-40.jpg",
  "TRIPOLARIS_OCT26-61.jpg",
  "TRIPOLARIS_OCT26-63.jpg",
  "TRIPOLARIS_OCT26-65.jpg",
  "TRIPOLARIS_OCT26-66.jpg",
  "TRIPOLARIS_OCT26-68.jpg",
  "TRIPOLARIS_OCT26-71.jpg",
  "TRIPOLARIS_OCT26-75.jpg",
  "TRIPOLARIS_OCT26-76.jpg",
  "TRIPOLARIS_OCT26-77.jpg"
];

const photoSource = (fileName) => `assets/fedra/${fileName}`;
const photoVariant = (fileName, size) => `assets/fedra/${size}/${fileName.replace(/\.jpg$/, ".webp")}`;
const photoDescription = (index) => `${(translations[document.documentElement.lang] || translations.es).photoAlt} ${index + 1}`;
const gallery = document.querySelector("[data-photo-gallery]");
const carousel = document.querySelector("[data-photo-carousel]");

const loadProgressiveImage = (image, source) => {
  image.dataset.progressiveSource = source;
  image.classList.remove("is-loaded");
  const highQualityImage = new Image();
  highQualityImage.decoding = "async";
  highQualityImage.onload = () => {
    if (image.dataset.progressiveSource === source) {
      image.src = source;
      image.classList.add("is-loaded");
    }
  };
  highQualityImage.src = source;
};

if (gallery) {
  gallery.innerHTML = fedraPhotos.map((fileName, index) => `
    <a class="photo-gallery-item" href="${photoSource(fileName)}" target="_blank" rel="noopener">
      <img class="progressive-image" src="${photoVariant(fileName, "preview")}" data-progressive-target="${photoVariant(fileName, "thumb")}" alt="${photoDescription(index)}" loading="lazy" decoding="async" />
    </a>
  `).join("");

  const galleryImages = [...gallery.querySelectorAll("img")];
  const loadGalleryImage = (image) => loadProgressiveImage(image, image.dataset.progressiveTarget);
  if ("IntersectionObserver" in window) {
    const galleryObserver = new IntersectionObserver((entries, observer) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        loadGalleryImage(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "360px 0px" });
    galleryImages.forEach((image) => galleryObserver.observe(image));
  } else {
    galleryImages.forEach(loadGalleryImage);
  }
}

if (carousel) {
  const carouselImage = carousel.querySelector("[data-carousel-image]");
  const carouselCount = carousel.querySelector("[data-carousel-count]");
  let activePhoto = 0;

  const renderCarousel = () => {
    carouselImage.src = photoVariant(fedraPhotos[activePhoto], "preview");
    carouselImage.alt = photoDescription(activePhoto);
    carouselCount.textContent = `${activePhoto + 1} / ${fedraPhotos.length}`;
    loadProgressiveImage(carouselImage, photoVariant(fedraPhotos[activePhoto], "web"));
  };

  carousel.querySelector("[data-carousel-previous]").addEventListener("click", () => {
    activePhoto = (activePhoto - 1 + fedraPhotos.length) % fedraPhotos.length;
    renderCarousel();
  });
  carousel.querySelector("[data-carousel-next]").addEventListener("click", () => {
    activePhoto = (activePhoto + 1) % fedraPhotos.length;
    renderCarousel();
  });
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") carousel.querySelector("[data-carousel-previous]").click();
    if (event.key === "ArrowRight") carousel.querySelector("[data-carousel-next]").click();
  });
  window.addEventListener("tripolaris:languagechange", () => {
    renderCarousel();
    gallery?.querySelectorAll("img").forEach((image, index) => {
      image.alt = photoDescription(index);
    });
  });
  renderCarousel();
}
