import i18n from "i18next";

const useLang = (en, ar) => {
  return i18n.language === "en" ? en : ar;
};
export default useLang;
