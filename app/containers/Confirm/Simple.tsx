import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { parseUrl } from "./utils";

const Simple = () => {
  const { t } = useTranslation();

  return (
    <Box p={2} textAlign="center" maxWidth="38em">
      <Typography variant="h5">{t`confirm.title`}</Typography>
      <Box height="10rem" my={4}>
        <img src="/confirm.svg" width="auto" height="100%" />
      </Box>
      <Typography
        color="primary"
        sx={{ pb: 2 }}
        dangerouslySetInnerHTML={{
          __html: parseUrl(
            t`confirm.simple.primaryText`,
            "explore",
            "https://exploregeneve.ch/"
          ),
        }}
      ></Typography>
    </Box>
  );
};

export default Simple;
