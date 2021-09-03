// import i18n from "i18next";
// import XHR from "i18next-xhr-backend";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//   .use(XHR)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init(
//     {
//       fallbackLng: "en",
//       lang: "en",
//       language: "en",
//       async: true,
//       debug: false,
//       react: {
//         // wait: true,
//         useSuspense: true,
//       },
//       languageOptions: ["en", "jp", "cn", "vm"],
//       whitelist: ["en", "jp", "cn", "vm"],
//       saveMissing: true,
//       saveMissingTo: "all",
//       keySeparator: true,
//       ns: ["translation"],
//       defaultNS: "translation",
//       backend: {
//         loadPath: `${process.env.API_URL}/translations/{{lng}}`,
//         addPath: "",
//         allowMultiLoading: true,
//         crossDomain: false,
//       },
//     },
//     (error, t) => {
//       if (error) console.error(error);
//     }
//   );

// export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import Loginen from "./Locales/en/Loginen.json";
import Loginjp from "./Locales/jp/Loginjp.json";
import Logincn from "./Locales/cn/Logincn.json";
import Menuen from "./Locales/en/Menuen.json";
import Menucn from "./Locales/cn/Menucn.json";
import Menujp from "./Locales/jp/Menujp.json";

const resources = {
  en: {
    login: Loginen,
    menu: Menuen,
  },
  jp: {
    login: Loginjp,
    menu: Menujp,
  },
  cn: {
    login: Logincn,
    menu: Menucn,
  },
};
i18n
  //   .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    lang: "en",
    language: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    languageOptions: ["en", "jp", "cn"],
    resources: resources,
  });

export default i18n;
