import useResponsesStore from "../stores/responses";
import usePersonStore from "../stores/person";
import { store as questionStore } from "../stores/questions";

type Payload = {
  responses: FormResponse[];
  person: Person;
  lang: string;
  completeForm: boolean;
};

export const sendResponse = async () => {
  const { lang = "nc" } = questionStore?.getState() || {};
  const { responses } = useResponsesStore.getState();
  const person = usePersonStore.getState().getPerson();
  const completeForm = usePersonStore.getState().completeForm;
  return sendApi({ responses, person, lang, completeForm });
};

const sendApi = async (payload: Payload) => {
  const rawResponse = await fetch("/api/response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return rawResponse.json();
};
