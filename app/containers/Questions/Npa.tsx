import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {
  onNext: () => void;
}

const Npa = (props: Props) => {
  const { onNext } = props;
  const { t } = useTranslation();
  const npa = usePersonStore(s => s.person.npa);
  const updatePerson = usePersonStore(s => s.updatePerson);

  const onTextChange = (event: any) => {
    updatePerson({ npa: event.target.value });
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`npa.title`}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ pt: 2, pb: 4 }}
      >{t`npa.description`}</Typography>
      <TextField
        fullWidth
        autoFocus
        label={t`npa.label`}
        placeholder="1208, 74160,..."
        value={npa}
        onChange={onTextChange}
        sx={{ mb: 4 }}
      />
      <Button variant="contained" onClick={onNext}>{t`generic.next`}</Button>
    </Box>
  );
};

export default Npa;
