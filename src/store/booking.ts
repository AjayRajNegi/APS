import { create } from "zustand";

type BookingState = {
  domestic: any;
  international: any;
  transit: any;
  setDomestic: (data: any) => void;
  setInternational: (data: any) => void;
  setTransit: (data: any) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  domestic: null,
  international: null,
  transit: null,
  setDomestic: (data) => set({ domestic: data }),
  setInternational: (data) => set({ international: data }),
  setTransit: (data) => set({ transit: data }),
}));
