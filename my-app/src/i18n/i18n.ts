import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HomeAdmin_en from '../locales/en/admin.json';
import HomeAdmin_vi from '../locales/vi/admin.json';
import LoginAndRegis_en from '../locales/en/loginAndRegis.json';
import LoginAndRegis_vi from '../locales/vi/loginAndRegis.json';


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
        loginAndRegis: LoginAndRegis_en,
      },
      vi: {
        homeAdmin: HomeAdmin_vi,
        loginAndRegis: LoginAndRegis_vi,
      },
    },  
    // defaultNS,
    ns: ['homeAdmin', 'loginAndRegis']
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
