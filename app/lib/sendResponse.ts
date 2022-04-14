import useResponsesStore from "../stores/responses";
import usePersonStore from "../stores/person";
import { store as questionStore } from "../stores/questions";

type Payload = {
  responses: FormResponse[];
  person: Person;
  lang: string;
  src: string;
};

export const sendResponse = async () => {
  const { lang = "nc" } = questionStore?.getState() || {};
  const { responses } = useResponsesStore.getState();
  const person = usePersonStore.getState().person;
  const src = getSource();

  if (responses?.length > 0) return sendApi({ responses, person, lang, src });
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
