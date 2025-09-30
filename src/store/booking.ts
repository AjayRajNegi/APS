import { create } from "zustand";

type BookingResponse = {
  EncryptID: string;
  Message?: string;
  Status?: string;
  [key: string]: any;
};

type BookingState = {
  domestic: BookingResponse | null;
  international: BookingResponse | null;
  transit: BookingResponse | null;
  setDomestic: (data: BookingResponse) => void;
  setInternational: (data: BookingResponse) => void;
  setTransit: (data: BookingResponse) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  domestic: null,
  international: null,
  transit: null,
  setDomestic: (data) => set({ domestic: data }),
  setInternational: (data) => set({ international: data }),
  setTransit: (data) => set({ transit: data }),
}));
