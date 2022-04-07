import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface Props {
  lang?: string;
  locales?: object;
}

const useI18n = ({ lang = "fr", locales = {} }: Props) => {
  i18n.use(initReactI18next).init({
    lng: lang,
    resources: {
      [lang]: {
        translation: locales,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    parseMissingKeyHandler: key => {
      console.log(`🌐 Missing translation: ${key}`);
      return key;
    },
  });
};

export default useI18n;
