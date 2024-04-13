import { create } from "zustand";

const useStore = create((set) => ({
  cmdCount: 0,
  cmdHistory: {},
  incCmdCount: () => set((state) => ({ cmdCount: (state.cmdCount += 1) })),
  setCmdZero: () => set((state) => ({ cmdCount: 0 })),
  addInHistory: (input) =>
    set((state) => ({ ...state.cmdHistory, [state.cmdCount]: input })),
}));
