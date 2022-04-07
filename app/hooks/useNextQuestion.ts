import { useRouter } from "next/router";
import { useCallback } from "react";
import { useQuestionsStore } from "../stores/questions";

const useNextQuestion = () => {
  const router = useRouter();
  const nextQuestion = useQuestionsStore(s => s.nextQuestion);
  const questionsCount = useQuestionsStore(s => s.questions.length);
  const currentIndex = useQuestionsStore(s => s.currentIndex);

  const onNextQuestion = useCallback(() => {
    if (questionsCount > currentIndex + 1) nextQuestion();
    else router.push(`${router.asPath}/send`);
  }, [questionsCount, currentIndex]);

  return onNextQuestion;
};

export default useNextQuestion;
