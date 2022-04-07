import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

interface Props {
  question: FormQuestion;
  onRespond: (response: string) => void;
}

const Text = (props: Props) => {
  const { question, onRespond } = props;
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const onNext = () => {
    onRespond(text);
    setText("");
  };

  return (
    <Box>
      <TextField
        fullWidth
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder={`${question.responses}`}
      />
      <Button
        onClick={onNext}
        variant="contained"
        sx={{ mt: 4 }}
      >{t`generic.next`}</Button>
    </Box>
  );
};

export default Text;
