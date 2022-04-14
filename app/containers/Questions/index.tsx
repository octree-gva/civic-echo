import { useReducer } from "react";
import Box from "@mui/material/Box";
import { useQuestionsStore } from "../../stores/questions";
import Question from "./Question";
import Email from "./Email";
import Npa from "./Npa";
import { personalIndex } from "../../config";

interface PersonQuestionProps {
  onNext: () => void;
}

const PersonalQuestions: React.FC<PersonQuestionProps>[] = [Email, Npa];

interface Props {}

const Questions = (props: Props) => {
  const questions = useQuestionsStore(s => s.questions);
  const currentQuestionIndex = useQuestionsStore(s => s.currentIndex);
  const currentQuestion = questions[currentQuestionIndex];
  const [currentPersonalIndex, nextPersonalQuestion] = useReducer(
    i => i + 1,
    0
  );

  if (
    currentQuestionIndex >= personalIndex &&
    currentPersonalIndex < PersonalQuestions.length
  ) {
    const Component: React.FC<PersonQuestionProps> =
      PersonalQuestions[currentPersonalIndex];
    return (
      <Box
        maxWidth="40rem"
        sx={{ bgcolor: "common.white", borderRadius: "24px" }}
      >
        <Component onNext={nextPersonalQuestion} />
      </Box>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Box
      maxWidth="40rem"
      sx={{ bgcolor: "common.white", borderRadius: "24px" }}
    >
      <Question question={currentQuestion} />
    </Box>
  );
};

export default Questions;
