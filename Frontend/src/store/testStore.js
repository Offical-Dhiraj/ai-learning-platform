import { create } from "zustand";

export const useTestStore = create((set) => ({
  testActive: false,
  questions: [],
  answers: {},

  startTest: (questions) =>
    set({ testActive: true, questions }),

  setAnswer: (qIndex, answer) =>
    set((state) => ({
      answers: { ...state.answers, [qIndex]: answer }
    })),

  resetTest: () =>
    set({ testActive: false, questions: [], answers: {} })
}));

