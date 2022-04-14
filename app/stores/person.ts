import create from "zustand";

type PersonStore = {
  person: Person;
  updatePerson: (update: Person) => void;
};

const usePersonStore = create<PersonStore>((set, get) => ({
  person: {
    email: "",
    acceptNotif: false,
    npa: "",
    completeForm: false,
  },
  updatePerson: update => {
    const currentPerson = get().person;
    set({ person: { ...currentPerson, ...update } });
  },
}));

export default usePersonStore;
