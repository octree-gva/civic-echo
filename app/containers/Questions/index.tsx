import { useReducer } from "react";
import { useQuestionsStore } from "../../stores/questions";
import Question from "./Question";
import Email from "./Email";
import Npa from "./Npa";
import { personalIndex } from "../../config";
import Wrapper from "./Wrapper";

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
      <Wrapper>
        <Component onNext={nextPersonalQuestion} />
      </Wrapper>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Wrapper>
      <Question question={currentQuestion} />
    </Wrapper>
  );
};

export default Questions;
