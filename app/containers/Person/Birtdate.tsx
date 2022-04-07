import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
      <Typography sx={{ py: 4 }}>{t`birthdate.description`}</Typography>
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
    </Box>
  );
};

export default Birthdate;
