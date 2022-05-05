import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import Responses from "../Responses";
import useNextQuestion from "../../hooks/useNextQuestion";

interface Props {
  question: FormQuestion;
}

const Question = (props: Props) => {
  const { question } = props;
  const { t } = useTranslation();
  const nextQuestion = useNextQuestion();

  if (!question) return null;

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5" sx={{px: 4}}>{question.title}</Typography>
      {question.description && (
        <Typography variant="subtitle1" sx={{ pt: 2, px: 4 }}>
          {question.description}
        </Typography>
      )}
      <Box mt={4}>
        <Responses question={question} />
      </Box>
      <Button
        size="small"
        color="secondary"
        sx={{ mt: 4}}
        onClick={nextQuestion}
        endIcon={<ChevronRightIcon />}
      >{t`generic.skip`}</Button>
    </Box>
  );
};

export default Question;
