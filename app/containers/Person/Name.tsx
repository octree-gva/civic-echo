import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";
import { sendResponse } from "../../lib/sendResponse";

interface Props {}

const Name = (props: Props) => {
  const { t } = useTranslation();
  const updatePerson = usePersonStore(s => s.updatePerson);
  const nextView = usePersonStore(s => s.nextView);

  const onChange = (event: any) => {
    updatePerson({ name: event.target.value });
  };

  const onNext = async () => {
    try {
      await sendResponse();
      nextView();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{t`name.title`}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ pt: 2, pb: 4 }}
      >{t`name.description`}</Typography>
      <TextField
        fullWidth
        autoFocus
        label={t`name.label`}
        placeholder="Kai Doe"
        onChange={onChange}
      />
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        onClick={onNext}
      >{t`generic.next`}</Button>
    </Box>
  );
};

export default Name;
