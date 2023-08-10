import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HomeAdmin_en from '../locales/en/adminHome.json';
import HomeAdmin_vi from '../locales/vi/adminHome.json';
import AdminManagerA_en from '../locales/en/adminManagerA.json';
import AdminManagerA_vi from '../locales/vi/adminManagerA.json';


// const defaultNS = 'homeAdmin'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",

    resources: {
      en: {
        homeAdmin: HomeAdmin_en,
        adminManagerA: AdminManagerA_en,
      },
      vi: {
        homeAdmin: HomeAdmin_vi,
        adminManagerA: AdminManagerA_vi,
      },
    },  
    // defaultNS,
    // ns: ['homeAdmin']
    // resources: {
    //   en: {
    //     translation: {
    //       learn: "learn",
    //       decription: "Edit",
    //     },
    //   },
    //   vi: {
    //     translation: {
    //       learn: "Học",
    //       decription: "Chỉnh sửa",
    //     },
    //   },
    // },
  });
