import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {}

const Confirm = (props: Props) => {
  const { t } = useTranslation();
  const email = usePersonStore(s => s.person.email);

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h4">{t`confirm.title`}</Typography>
      <Typography>Image</Typography>
      <Typography color="primary">{t`confirm.primaryText`}</Typography>
      <Typography>
        {email} {t(`confirm.secondaryText`)}
      </Typography>
    </Box>
  );
};

export default Confirm;
