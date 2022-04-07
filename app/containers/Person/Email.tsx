import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {}

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Email = (props: Props) => {
  const { t } = useTranslation();
  const updatePerson = usePersonStore(s => s.updatePerson);
  const email = usePersonStore(s => s.person.email);
  const acceptNotif = usePersonStore(s => s.person.acceptNotif);
  const nextView = usePersonStore(s => s.nextView);
  const isEmailValid = useMemo(() => email?.match(EMAIL_REGEX), [email]);

  const onTextChange = event => {
    updatePerson({ email: event.target.value });
  };

  const onCheckboxChange = event => {
    updatePerson({ acceptNotif: event.target.checked });
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`email.title`}</Typography>
      <Typography sx={{ py: 4 }}>{t`email.description`}</Typography>
      <TextField
        fullWidth
        autoFocus
        label={t`email.label`}
        placeholder="kai@example.com"
        value={email}
        onChange={onTextChange}
      />
      <FormControlLabel
        sx={{ my: 4 }}
        control={<Checkbox checked={acceptNotif} onChange={onCheckboxChange} />}
        label={t`email.checkbox`}
        componentsProps={{ typography: { variant: "body2" } }}
      />
      <Button
        variant="contained"
        onClick={nextView}
        disabled={!isEmailValid}
      >{t`generic.next`}</Button>
    </Box>
  );
};

export default Email;
