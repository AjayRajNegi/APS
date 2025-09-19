import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { BookingForm } from "../components/BookingForm";
import { Save } from "../components/Save";

export default function ManageBookings() {
  return (
    <>
      {/* Section 1 */}
      <main
        className="bg-aps-200 flex h-[85vh] w-full items-end rounded-4xl"
        style={{
          backgroundImage: `url('/mainImage.png')`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex w-full flex-col items-center p-4">
          <div className="mb-[calc(min(10vw,350px))] text-center text-7xl tracking-tighter text-white">
            MANAGE <br /> MY BOOKINGS
          </div>
          <div className="flex w-full justify-between">
            <div className="flex w-1/5 flex-col justify-end">
              <p className="leading-tight text-white">
                Find and book the best flights quickly. Compare prices, select
                your airline, and book with confidence-all in one place.
              </p>
              <div className="mt-4 flex items-center shadow-2xl">
                <Link
                  href="/"
                  className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white text-shadow-xs"
                >
                  Booking Now
                </Link>

                <ArrowDownRight
                  className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                  size={30}
                />
              </div>
            </div>
            <BookingForm />
          </div>
        </div>
      </main>
      {/* Section 2 */}
      <Save />
    </>
  );
}
