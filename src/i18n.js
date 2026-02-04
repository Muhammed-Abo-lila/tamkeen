import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// Change Diraction
i18n.on("languageChanged", (locale) => {
  let diraction = i18n.dir(locale);
  document.body.dir = diraction;
});

// check if url contians lang param
const urlParams = new URLSearchParams(window.location.search);
// Initialize lang Options
const initLang =
  urlParams.get("lang") || localStorage.getItem("i18nextLng") || "en";

// configuration
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    supportedLngs: ["en", "ar"],
    // condition for wrong languages
    lng: initLang === "ar" || initLang === "en" ? initLang : "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
