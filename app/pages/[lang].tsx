import type { GetStaticProps, NextPage } from "next";
import Box from "@mui/material/Box";
import langs, { LANGS, getLangContent } from "../langs";
import Questions from "../containers/Questions";
import Topbar from "../containers/Topbar";

interface Props {}

const QuestionsPage: NextPage<Props> = (props: Props) => {
  return (
    <Box>
      <Topbar />
      <Questions />
    </Box>
  );
};

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

export default QuestionsPage;
