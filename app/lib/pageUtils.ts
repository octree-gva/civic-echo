import type { GetStaticProps } from "next";
import langs, { LANGS, getLangContent } from "../langs";
import { isClosed } from "../config";

export const getStaticProps: GetStaticProps = async context => {
  const selectedLang = context.params?.lang || "fr";
  const langContent: LangContent =
    getLangContent(selectedLang as string) || langs[0];
  const { questions = [], locales = [] } = langContent || {};

  if (isClosed)
    return {
      redirect: {
        destination: `/${selectedLang}/closed`,
        permanent: false,
      },
    };

  return {
    props: {
      initialZustandState: { questions, lang: selectedLang },
      locales,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: LANGS.map(lang => ({ params: { lang } })),
    fallback: false,
  };
}
