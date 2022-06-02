import useResponsesStore from "../../stores/responses";
import ListChoice from "./ListChoice";
import YesNo from "./YesNo";
import Text from "./Text";
import Button from "./Button";
import Iframe from "./Iframe";
import SortList from "./SortList";

const TYPES = {
  LIST_CHOICE: "Choix unique",
  SORT_LIST: "Triage",
  YES_NO: "Swipe",
  TEXT: "Champ texte",
  BUTTON: "Bouton",
  IFRAME: "Iframe",
};

interface Props {
  question: FormQuestion;
  onNext: () => void;
}

const Responses = (props: Props) => {
  const { question, onNext } = props;
  const addResponse = useResponsesStore(s => s.addResponse);

  const onRespond = (response: number | string | string[]) => {
    addResponse({
      questionId: question.id,
      content: response,
    });
    onNext();
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
    case TYPES.IFRAME:
      return <Iframe question={question} />;
    default:
      return null;
  }
};

export default Responses;
