import create from "zustand";

type ResponsesStore = {
  responses: FormResponse[];
  addResponse: (response: FormResponse) => void;
};

const useResponsesStore = create<ResponsesStore>((set, get) => ({
  responses: [],
  addResponse: response => {
    const currentResponses = get().responses;
    set({ responses: [...currentResponses, response] });
  },
}));

export default useResponsesStore;
