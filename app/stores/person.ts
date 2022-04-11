import create from "zustand";
import { DateTime } from "luxon";

type PersonStore = {
  person: Person;
  getPerson: () => Person;
  updatePerson: (update: Person) => void;
  currentViewIndex: number;
  nextView: () => void;
};

const usePersonStore = create<PersonStore>((set, get) => ({
  person: {
    name: "",
    email: "",
    birthdate: DateTime.now(),
    acceptNotif: false,
  },
  currentViewIndex: 0,
  getPerson: () => {
    const person = get().person;
    return {
      ...person,
      birtdate: person.birthdate?.toISODate(),
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
}));

export default usePersonStore;
