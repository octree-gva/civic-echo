import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {}

const Name = (props: Props) => {
  const { t } = useTranslation();
  const updatePerson = usePersonStore(s => s.updatePerson);
  const nextView = usePersonStore(s => s.nextView);

  const onChange = event => {
    updatePerson({ name: event.target.value });
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`name.title`}</Typography>
      <Typography sx={{ py: 4 }}>{t`name.description`}</Typography>
      <TextField
        fullWidth
        autoFocus
        label={t`name.label`}
        placeholder="kai@example.com"
        onChange={onChange}
      />
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        onClick={nextView}
      >{t`generic.next`}</Button>
    </Box>
  );
};

export default Name;
