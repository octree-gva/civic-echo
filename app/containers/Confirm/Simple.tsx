import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

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
      >{t`confirm.simple.primaryText`}</Typography>
    </Box>
  );
};

export default Simple;
