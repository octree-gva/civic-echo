import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Responses from "../Responses";

interface Props {
  question: FormQuestion;
}

const Question = (props: Props) => {
  const { question } = props;

  if (!question) return null;

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5">{question.title}</Typography>
      {question.description && (
        <Typography sx={{ py: 4 }}>{question.description}</Typography>
      )}
      <Box mt={4}>
        <Responses question={question} />
      </Box>
    </Box>
  );
};

export default Question;
