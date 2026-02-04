// import i18n from "i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";
// // Set language direction on language change
// i18n.on("languageChanged", (locale) => {
//   const direction = i18n.dir(locale);
//   document.body.dir = direction;
//   document.documentElement.lang = locale;
// });
// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     supportedLngs: ["en", "ar"],
//     fallbackLng: "en",
//     detection: {
//       order: ["path", "localStorage", "navigator"],
//       caches: ["localStorage"],
//     },
//   });
// export default i18n;

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
