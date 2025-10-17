import { create } from "zustand";

type LoaderState = {
  loading: boolean;
  show: () => void;
  hide: () => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  show: () => set({ loading: true }),
  hide: () => set({ loading: false }),
}));
