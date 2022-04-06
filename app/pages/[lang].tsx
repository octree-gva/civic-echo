import type { GetStaticProps, NextPage } from "next";
import Box from "@mui/material/Box";
import langs, { LANGS, getLangContent } from "../langs";
import Questions from "../containers/Questions";

interface Props {
  locales: object;
}

const Home: NextPage<Props> = (props: Props) => {
  const { locales = {} } = props;

  return (
    <Box>
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
    props: { initialZustandState: { questions }, locales },
  };
};

export async function getStaticPaths() {
  return {
    paths: LANGS.map(lang => ({ params: { lang } })),
    fallback: true,
  };
}

export default Home;
