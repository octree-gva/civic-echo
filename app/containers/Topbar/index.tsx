import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

interface Props {
  onNext?: () => void;
}

const Topbar = (props: Props) => {
  const { onNext } = props;
  const { t } = useTranslation();

  return (
    <Box position="static" display="flex" justifyContent="space-between" p={2}>
      <Typography variant="h6">
        Demain c'est <br />
        ...aujourd'hui?
      </Typography>
      <Box>{onNext && <Button onClick={onNext}>{t`generic.skip`}</Button>}</Box>
    </Box>
  );
};

export default Topbar;
