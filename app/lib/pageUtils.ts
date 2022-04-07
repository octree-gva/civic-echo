import type { GetStaticProps } from "next";
import langs, { LANGS, getLangContent } from "../langs";

export const getStaticProps: GetStaticProps = async context => {
  const selectedLang = context.params?.lang || "fr";
  const langContent: LangContent =
    getLangContent(selectedLang as string) || langs[0];
  const { questions = [], locales = [] } = langContent || {};

  return {
    props: {
      initialZustandState: { questions },
      locales,
      lang: selectedLang,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: LANGS.map(lang => ({ params: { lang } })),
    fallback: false,
  };
}
