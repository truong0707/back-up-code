import { useTranslation, Trans } from "react-i18next";

const lngs: any = {
  en: { nativeName: "English" },
  vi: { nativeName: "Deutsch" },
};

export default function I18n() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {/* <p>
        {Object.keys(lngs).map((lng) => (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </p> */}

      {/*  */}
    
    </div>
  );
}