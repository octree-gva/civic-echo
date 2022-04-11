import useResponsesStore from "../stores/responses";
import usePersonStore from "../stores/person";
import { store as questionStore } from "../stores/questions";

type Payload = {
  responses: FormResponse[];
  person: Person;
  lang: string;
  completeForm: boolean;
  src: string;
};

export const sendResponse = async () => {
  const { lang = "nc" } = questionStore?.getState() || {};
  const { responses } = useResponsesStore.getState();
  const person = usePersonStore.getState().getPerson();
  const completeForm = usePersonStore.getState().completeForm;
  const src = getSource();

  if (responses?.length > 0)
    return sendApi({ responses, person, lang, completeForm, src });
};

const getSource = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("src") || "direct";
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
