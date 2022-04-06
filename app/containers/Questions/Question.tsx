import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  question: FormQuestion;
}

const Question = (props: Props) => {
  const { question } = props;

  return (
    <Box>
      <Typography>{question.title}</Typography>
      <Typography>{question.description}</Typography>
      <Typography>{question.type}</Typography>
      <Typography>{question.category}</Typography>
    </Box>
  );
};

export default Question;
