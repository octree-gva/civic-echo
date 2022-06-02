import { useReducer, useRef } from "react";
import { useQuestionsStore } from "../../stores/questions";
import Question from "./Question";
import Email from "./Email";
import Npa from "./Npa";
import { personalIndex } from "../../config";
import Wrapper from "./Wrapper";
import useNextQuestion from "../../hooks/useNextQuestion";

interface PersonQuestionProps {
  onNext: () => void;
}

const ANIMATE_CLASSES =
  "animate__animated animate__faster animate__fadeInRight";
const ANIMATE_ANIMATION_CLASS = "animate__fadeOutLeft";
const PersonalQuestions: React.FC<PersonQuestionProps>[] = [Email, Npa];

interface Props {}

const Questions = (props: Props) => {
  const cardRef = useRef<HTMLElement>();
  const questions = useQuestionsStore(s => s.questions);
  const { onNextQuestion, isLast } = useNextQuestion();
  const currentQuestionIndex = useQuestionsStore(s => s.currentIndex);
  const currentQuestion = questions[currentQuestionIndex];
  const [currentPersonalIndex, nextPersonalQuestion] = useReducer(
    i => i + 1,
    0
  );

  const onNext = (nextFn: () => void) => () => {
    cardRef.current?.classList.add(ANIMATE_ANIMATION_CLASS);
    setTimeout(() => {
      nextFn();
      if (!isLast) cardRef.current?.classList.remove(ANIMATE_ANIMATION_CLASS);
    }, 500);
  };

  if (
    currentQuestionIndex >= personalIndex &&
    currentPersonalIndex < PersonalQuestions.length
  ) {
    const Component: React.FC<PersonQuestionProps> =
      PersonalQuestions[currentPersonalIndex];
    return (
      <Wrapper ref={cardRef} className={ANIMATE_CLASSES}>
        <Component onNext={onNext(nextPersonalQuestion)} />
      </Wrapper>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Wrapper ref={cardRef} className={ANIMATE_CLASSES}>
      <Question question={currentQuestion} onNext={onNext(onNextQuestion)} />
    </Wrapper>
  );
};

export default Questions;
