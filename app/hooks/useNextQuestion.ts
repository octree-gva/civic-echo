import { useRouter } from "next/router";
import { useCallback } from "react";
import usePersonStore from "../stores/person";
import { useQuestionsStore } from "../stores/questions";

const useNextQuestion = () => {
  const router = useRouter();
  const nextQuestion = useQuestionsStore(s => s.nextQuestion);
  const questionsCount = useQuestionsStore(s => s.questions.length);
  const currentIndex = useQuestionsStore(s => s.currentIndex);
  const setCompleteForm = usePersonStore(s => s.setCompleteForm);

  const onNextQuestion = useCallback(() => {
    if (questionsCount > currentIndex + 1) nextQuestion();
    else {
      setCompleteForm(true);
      router.push(`${router.query.lang}/send${window.location.search}`);
    }
  }, [questionsCount, currentIndex]);

  return onNextQuestion;
};

export default useNextQuestion;
