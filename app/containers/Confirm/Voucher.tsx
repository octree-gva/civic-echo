import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

const Voucher = () => {
  const { t } = useTranslation();
  const email = usePersonStore(s => s.person.email);

  return (
    <Box p={2} textAlign="center" maxWidth="38em">
      <Typography variant="h5">{t`confirm.title`}</Typography>
      <Box height="10rem" my={4}>
        <img src="/voucher.svg" width="auto" height="100%" />
      </Box>
      <Typography
        color="primary"
        sx={{ pb: 2 }}
      >{t`confirm.voucher.primaryText`}</Typography>
      <Typography>
        {email} {t(`confirm.voucher.secondaryText`)}
      </Typography>
    </Box>
  );
};

export default Voucher;
