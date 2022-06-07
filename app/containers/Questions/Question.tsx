import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import Responses from "../Responses";

interface Props {
  question: FormQuestion;
  onNext: () => void;
}

const Question = (props: Props) => {
  const { question, onNext } = props;
  const { t } = useTranslation();

  if (!question) return null;

  return (
    <>
      <Typography variant="h5" sx={{ px: 4 }}>
        {question.title?.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Typography>
      {question.description && (
        <Typography variant="body2" sx={{ pt: 2, px: 4 }}>
          {question.description?.split("/n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Typography>
      )}
      <Box mt={4} width="100%">
        <Responses question={question} onNext={onNext} />
      </Box>
      <Button
        size="small"
        color="secondary"
        sx={{ mt: 4, flexGrow: 0 }}
        onClick={onNext}
        endIcon={<ChevronRightIcon />}
      >{t`generic.skip`}</Button>
    </>
  );
};

export default Question;
