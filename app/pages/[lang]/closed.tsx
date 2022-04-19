import type { GetStaticProps, NextPage } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Topbar from "../../containers/Topbar";
import Bottombar from "../../containers/Bottombar";
import { useTranslation } from "react-i18next";
import { resultsUrl } from "../../config";
import langs, { LANGS, getLangContent } from "../../langs";

interface Props {}

const ClosedPage: NextPage<Props> = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ bgcolor: { md: "secondary.light" } }}
    >
      <Topbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h5">{t`closed.title`}</Typography>
        <Typography sx={{ mt: 2, mb: 6 }}>{t`closed.text`}</Typography>
        <a href={resultsUrl}>
          <Button variant="contained">{t`closed.button`}</Button>
        </a>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const selectedLang = context.params?.lang || "fr";
  const langContent: LangContent =
    getLangContent(selectedLang as string) || langs[0];
  const { locales = [] } = langContent || {};

  return {
    props: {
      locales,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: LANGS.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export default ClosedPage;
