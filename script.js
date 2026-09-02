const translations = {
  es: {
    navAbout: "Sobre Nosotros",
    navMenu: "La Carta",
    navContact: "Contacto",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Coctelería de autor en Les Corts, Barcelona",
    heroCta: "Ver la Carta",
    aboutEyebrow: "Sobre Nosotros",
    aboutTitle: "Un bar con tres almas",
    aboutText:
      "Tripolaris nace de la pasión de Nelio, Angelo y Cesar, tres amigos que mezclan coctelería de autor, música en vivo y cultura local en Les Corts.",
    featureOneTitle: "Mixología",
    featureOneText: "Cócteles creativos preparados con técnica, color y personalidad.",
    featureTwoTitle: "Música en Vivo",
    featureTwoText: "Sesiones y noches culturales para quedarse un rato más.",
    featureThreeTitle: "Cultura",
    featureThreeText: "Un punto de encuentro cercano en el barrio de Les Corts.",
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
    navMenu: "La Carta",
    navContact: "Contacte",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Cocteleria d’autor a Les Corts, Barcelona",
    heroCta: "Veure la Carta",
    aboutEyebrow: "Sobre Nosaltres",
    aboutTitle: "Un bar amb tres ànimes",
    aboutText:
      "Tripolaris neix de la passió de Nelio, Angelo i Cesar, tres amics que barregen cocteleria d’autor, música en viu i cultura local a Les Corts.",
    featureOneTitle: "Mixologia",
    featureOneText: "Còctels creatius preparats amb tècnica, color i personalitat.",
    featureTwoTitle: "Música en Viu",
    featureTwoText: "Sessions i nits culturals per quedar-se una estona més.",
    featureThreeTitle: "Cultura",
    featureThreeText: "Un punt de trobada proper al barri de Les Corts.",
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
    navMenu: "Menu",
    navContact: "Contact",
    tagline: "Creative Drinks | Cultural Vibes",
    heroSubtitle: "Signature cocktails in Les Corts, Barcelona",
    heroCta: "See the Menu",
    aboutEyebrow: "About Us",
    aboutTitle: "A bar with three souls",
    aboutText:
      "Tripolaris was born from the passion of Nelio, Angelo, and Cesar, three friends blending signature cocktails, live music, and local culture in Les Corts.",
    featureOneTitle: "Mixology",
    featureOneText: "Creative cocktails prepared with technique, color, and personality.",
    featureTwoTitle: "Live Music",
    featureTwoText: "Sessions and cultural nights made for staying a little longer.",
    featureThreeTitle: "Culture",
    featureThreeText: "A welcoming meeting point in the Les Corts neighborhood.",
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
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
  window.dispatchEvent(new CustomEvent("tripolaris:languagechange", { detail: { language } }));
};

window.tripolarisTranslations = translations;

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});
