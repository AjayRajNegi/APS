import { ArrowRight } from "lucide-react";

export function BookingForm() {
  return (
    <div className="w-full max-w-4xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-6 shadow-xl">
        <form className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
          {/* Booking ID */}
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="bookingId"
              className="mb-2 text-lg font-medium md:text-xl"
            >
              Booking ID:
            </label>
            <input
              id="bookingId"
              type="text"
              placeholder="Destination Airport"
              className="w-full rounded-full border-none bg-white px-6 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="phone"
              className="mb-2 text-lg font-medium md:text-xl"
            >
              Phone Number:
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-full border-none bg-white px-6 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="group from-aps-secondary-500 to-aps-secondary-300 flex items-center justify-center gap-1 rounded-full border-[1px] border-white bg-gradient-to-r px-6 py-3 font-medium transition duration-300 hover:border-[1px] md:col-span-2"
          >
            <p className="transition-transform duration-300 group-hover:-translate-x-[5px] group-hover:text-white">
              Book Now
            </p>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-[5px] group-hover:text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
