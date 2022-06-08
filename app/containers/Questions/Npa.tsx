import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import usePersonStore from "../../stores/person";
import Text from "../../components/Text";

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
    <>
      <Text variant="h5">{t`npa.title`}</Text>
      <Text variant="body2" sx={{ pt: 2, pb: 4 }}>{t`npa.description`}</Text>
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
      <Box>
        <Button
          size="small"
          color="secondary"
          sx={{ mt: 4 }}
          onClick={onNext}
          endIcon={<ChevronRightIcon />}
        >{t`generic.skip`}</Button>
      </Box>
    </>
  );
};

export default Npa;
