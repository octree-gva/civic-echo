import useResponsesStore from "../../stores/responses";
import ListChoice from "./ListChoice";
import YesNo from "./YesNo";
import Text from "./Text";
import Button from "./Button";
import SortList from "./SortList";
import useNextQuestion from "../../hooks/useNextQuestion";

const TYPES = {
  LIST_CHOICE: "Choix unique",
  SORT_LIST: "Triage",
  YES_NO: "Swipe",
  TEXT: "Champ texte",
  BUTTON: "Bouton",
};

interface Props {
  question: FormQuestion;
}

const Responses = (props: Props) => {
  const { question } = props;
  const nextQuestion = useNextQuestion();
  const addResponse = useResponsesStore(s => s.addResponse);

  const onRespond = (response: number | string | string[]) => {
    addResponse({
      questionId: question.id,
      content: response,
    });
    nextQuestion();
  };

  switch (question.type) {
    case TYPES.LIST_CHOICE:
      return <ListChoice question={question} onRespond={onRespond} />;
    case TYPES.SORT_LIST:
      return <SortList question={question} onRespond={onRespond} />;
    case TYPES.YES_NO:
      return <YesNo onRespond={onRespond} />;
    case TYPES.TEXT:
      return <Text question={question} onRespond={onRespond} />;
    case TYPES.BUTTON:
      return <Button question={question} />;
    default:
      return null;
  }
};

export default Responses;
