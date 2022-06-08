import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Text from "../../components/Text";

const Simple = () => {
  const { t } = useTranslation();

  return (
    <Box p={2} textAlign="center" maxWidth="38em">
      <Typography variant="h5">{t`confirm.title`}</Typography>
      <Box height="10rem" my={4}>
        <img src="/confirm.svg" width="auto" height="100%" />
      </Box>
      <Text
        color="primary"
        sx={{ pb: 2 }}
      >{t`confirm.simple.primaryText`}</Text>
    </Box>
  );
};

export default Simple;
