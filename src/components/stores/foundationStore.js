import create from "zustand";

export const useFoundationStore = create((set) => ({
  type: "estacas",
  setFoundation: (type) => set(() => ({ type })),
}));
