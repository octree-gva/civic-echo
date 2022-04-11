import useResponsesStore from "../stores/responses";
import usePersonStore from "../stores/person";

type Payload = {
  responses: FormResponse[];
  person: Person;
};

export const sendResponse = async () => {
  const { responses } = useResponsesStore.getState();
  const person = usePersonStore.getState().getPerson();
  return sendApi({ responses, person });
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
