import { useRouter } from "next/router";
import { useCallback } from "react";
import usePersonStore from "../stores/person";
import { useQuestionsStore } from "../stores/questions";

const useNextQuestion = () => {
  const router = useRouter();
  const nextQuestion = useQuestionsStore(s => s.nextQuestion);
  const questionsCount = useQuestionsStore(s => s.questions.length);
  const currentIndex = useQuestionsStore(s => s.currentIndex);
  const completeProfile = usePersonStore(
    s => !!s.person.email && !!s.person.npa
  );
  const updatePerson = usePersonStore(s => s.updatePerson);
  const isLast: boolean = questionsCount <= currentIndex + 1;

  const onNextQuestion = useCallback(() => {
    if (questionsCount > currentIndex + 1) nextQuestion();
    else {
      updatePerson({ completeForm: true });
      const route = completeProfile ? "send" : "personal";
      router.push(`/${router.query.lang}/${route}${window.location.search}`);
    }
  }, [questionsCount, currentIndex]);

  return { onNextQuestion, isLast };
};

export default useNextQuestion;
