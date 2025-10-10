import Link from "next/link";
import { Save } from "../components/Save";
import { ArrowDownRight } from "lucide-react";
import { BookingForm } from "../components/BookingForm";

export default function ManageBookings() {
  return (
    <>
      {/* Section 1 */}
      <main
        className="bg-aps-200 relative flex min-h-[min(calc(85vh,650px))] w-full items-end rounded-4xl"
        style={{
          backgroundImage: `url('/mainImage.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex w-full flex-col items-center p-4 md:p-10">
          {/* Heading */}
          <div className="mb-[calc(min(10vw,250px))] text-center text-4xl leading-tight font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            MANAGE <br /> MY BOOKINGS
          </div>

          <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:justify-between md:gap-12">
            <div className="order-2 flex flex-col md:order-1 md:hidden md:w-1/3 lg:flex lg:w-1/3">
              <p className="text-sm leading-snug text-white sm:text-base md:text-lg">
                Find and book the best flights quickly. Compare prices, select
                your airline, and book with confidence — all in one place.
              </p>

              <div className="mt-3 flex items-center md:mt-6">
                <Link
                  href="#_"
                  className="group border-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full border-[2px] p-4 px-6 py-2 font-medium shadow-md transition duration-300 ease-out"
                >
                  <span className="ease bg-aps-secondary-300 absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-white duration-300 group-hover:translate-x-0">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                  <span className="ease text-aps-secondary-300 absolute flex h-full w-full transform items-center justify-center transition-all duration-300 group-hover:translate-x-full">
                    Book Now
                  </span>
                  <span className="invisible relative">Book Now</span>
                </Link>

                <ArrowDownRight
                  className="bg-aps-secondary-300 border-aps-secondary-400 animate-bounce-y -rotate-90 rounded-full border-[1px] p-1 text-white"
                  size={32}
                />
              </div>
            </div>

            {/* Right (Booking Form) */}
            <div className="order-1 w-full md:order-2 md:w-full lg:w-2/3">
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
      {/* Section 2 */}
      <Save />
    </>
  );
}
