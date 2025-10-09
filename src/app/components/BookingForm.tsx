import { ArrowRight } from "lucide-react";
import ManageBooking from "./ManageBooking";

export function BookingForm() {
  return (
    <div className="w-full max-w-4xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-6 shadow-xl">
        <ManageBooking />
      </div>
    </div>
  );
}
