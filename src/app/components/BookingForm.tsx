import { ArrowRight } from "lucide-react";

export function BookingForm() {
  return (
    <div className="max-w-4xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-6 shadow-xl">
        <form className="flex gap-10">
          <div className="flex flex-col">
            <label htmlFor="input " className="text-2xl">
              Booking ID:
            </label>
            <input
              type="text"
              placeholder="Destination Airport"
              className="flex-1 rounded-full border-none bg-white px-8 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="input" className="text-2xl">
              Phone Number:
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="flex-1 rounded-full border-none bg-white px-8 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-aps-secondary-200 hover:bg-aps-secondary-400 flex items-center gap-1 rounded-full px-8 py-3 font-medium transition"
          >
            Search Now
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
