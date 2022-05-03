import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";

interface Props {
  onNext: () => void;
}

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Email = (props: Props) => {
  const { onNext } = props;
  const { t } = useTranslation();
  const updatePerson = usePersonStore(s => s.updatePerson);
  const storeEmail = usePersonStore(s => s.person.email);
  const acceptNotif = usePersonStore(s => s.person.acceptNotif);
  const [email, setEmail] = useState<string>(storeEmail || "");
  const isEmailValid = useMemo(() => email?.match(EMAIL_REGEX), [email]);

  const onTextChange = (event: any) => setEmail(event.target.value);

  const onCheckboxChange = (event: any) =>
    updatePerson({ acceptNotif: event.target.checked });

  const onFinish = () => {
    updatePerson({ email });
    onNext();
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`email.title`}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ pt: 2, pb: 4 }}
      >{t`email.description`}</Typography>
      <TextField
        fullWidth
        autoFocus
        label={t`email.label`}
        placeholder="kai@example.com"
        value={email}
        onChange={onTextChange}
      />
      <FormControlLabel
        sx={{ my: 4, textAlign: 'left' }}
        control={
          <Checkbox
            checked={acceptNotif}
            onChange={onCheckboxChange}
            disabled={!email}
          />
        }
        label={t`email.checkbox`}
        componentsProps={{ typography: { variant: "body2" } }}
      />
      <Button
        variant="contained"
        onClick={onFinish}
        disabled={!!email && !isEmailValid}
      >{t`generic.next`}</Button>
    </Box>
  );
};

export default Email;
