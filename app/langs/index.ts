import fr from "./fr.yaml";
import en from "./en.yaml";
import de from "./de.yaml";
import pt from "./pt.yaml";

export const LANGS = ["fr", "en", "pt", "de"];

const langs: LangContent[] = [fr, en, de, pt];

export const getLangContent = (targetLang: string) => {
  return langs.find(lang => lang.lang === targetLang);
};

export default langs;
