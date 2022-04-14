import Box from "@mui/material/Box";
import { useQuestionsStore } from "../../stores/questions";
import Question from "./Question";

interface Props {}

const Questions = (props: Props) => {
  const currentIndex = useQuestionsStore(s => s.currentIndex);
  const questions = useQuestionsStore(s => s.questions);
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return null;

  return (
    <Box maxWidth="40rem" sx={{ bgcolor: "secondary.light" }}>
      <Question question={currentQuestion} />
    </Box>
  );
};

export default Questions;
