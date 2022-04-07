import { useLayoutEffect } from "react";
import create, { UseBoundStore } from "zustand";
import createContext from "zustand/context";

interface QuestionsStore {
  lang: string;
  questions: FormQuestion[];
  currentIndex: number;

  setQuestions: (questions: FormQuestion[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

let store: UseBoundStore<QuestionsStore> | undefined;

const zustandContext = createContext<QuestionsStore>();
export const Provider = zustandContext.Provider;
export const useQuestionsStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<QuestionsStore>((set, get) => ({
    lang: "fr",
    questions: [],
    currentIndex: 0,

    setQuestions: questions => set({ questions }),
    nextQuestion: () => {
      const nextIndex = get().currentIndex + 1;
      set({ currentIndex: nextIndex });
    },
    previousQuestion: () => {
      const currentIndex = get().currentIndex;
      if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
    },

    ...preloadedState,
  }));
};

export function useHydrate(initialState: QuestionsStore) {
  let _store = store ?? initializeStore(initialState);

  // For SSR & SSG, always use a new store.
  if (typeof window !== "undefined") {
    // For CSR, always re-use same store.
    if (!store) {
      store = _store;
    }

    // And if initialState changes, then merge states in the next render cycle.
    //
    // eslint complaining "React Hooks must be called in the exact same order in every component render"
    // is ignorable as this code runs in the same order in a given environment (CSR/SSR/SSG)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (initialState && store) {
        store.setState({
          ...store.getState(),
          ...initialState,
        });
      }
    }, [initialState]);
  }

  return _store;
}
