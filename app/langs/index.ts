import fr from "./fr.yaml";

export const LANGS = ["fr", "en", "pt"];

const langs: LangContent[] = [fr];

export const getLangContent = (targetLang: string) => {
  return langs.find(lang => lang.lang === targetLang);
};

export default langs;
