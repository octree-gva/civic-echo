import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {}

const Birthdate = (props: Props) => {
  const { t } = useTranslation();
  const birthdate = usePersonStore(s => s.person.birthdate);
  const updatePerson = usePersonStore(s => s.updatePerson);
  const nextView = usePersonStore(s => s.nextView);

  const onChange = (newBirthdate: DateTime) => {
    updatePerson({ birthdate: newBirthdate });
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`birthdate.title`}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ pt: 2, pb: 4 }}
      >{t`birthdate.description`}</Typography>
      <MobileDatePicker
        label={t`birthdate.label`}
        inputFormat="MM/dd/yyyy"
        value={birthdate}
        onChange={newBirthdate => onChange(newBirthdate)}
        onClose={nextView}
        renderInput={params => <TextField fullWidth {...params} />}
        cancelText={""}
        showToolbar={false}
      />
      <Button
        size="small"
        color="secondary"
        sx={{ mt: 4 }}
        onClick={nextView}
        endIcon={<ChevronRightIcon />}
      >{t`generic.skip`}</Button>
    </Box>
  );
};

export default Birthdate;
