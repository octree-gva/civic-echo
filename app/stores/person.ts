import create from "zustand";
import { DateTime } from "luxon";

type PersonStore = {
  person: Person;
  completeForm: boolean;
  getPerson: () => Person;
  updatePerson: (update: Person) => void;
  currentViewIndex: number;
  nextView: () => void;
  setCompleteForm: (completeForm: boolean) => void;
};

const usePersonStore = create<PersonStore>((set, get) => ({
  person: {
    name: "",
    email: "",
    birthdate: DateTime.now(),
    acceptNotif: false,
  },
  currentViewIndex: 0,
  completeForm: false,

  getPerson: () => {
    const person = get().person;
    return {
      ...person,
      birthdate: person.birthdate?.toISODate(),
    };
  },
  updatePerson: update => {
    const currentPerson = get().person;
    set({ person: { ...currentPerson, ...update } });
  },
  nextView: () => {
    const currentIndex = get().currentViewIndex;
    set({ currentViewIndex: currentIndex + 1 });
  },
  setCompleteForm: completeForm => set({ completeForm }),
}));

export default usePersonStore;
