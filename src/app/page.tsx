import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { TicketForm } from "./components/TicketForm";

export default function Home() {
  return (
    <div>
      {/* Main Section */}
      <main
        className="bg-aps-200 flex h-[80vh] w-full items-end rounded-4xl"
        style={{
          backgroundImage: `url('/mainImage.png')`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex w-full justify-between p-4">
          <div className="flex w-1/5 flex-col justify-end">
            <p className="leading-tight text-white">
              Find and book the best flights quickly. Compare prices, select
              your airline, and book with confidence-all in one place.
            </p>
            <div className="mt-4 flex items-center shadow-2xl">
              <Link
                href="/"
                className="bg-aps-400 rounded-full px-3 py-2 text-white text-shadow-xs"
              >
                Booking Now
              </Link>

              <ArrowDownRight
                className="bg-aps-400 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={30}
              />
            </div>
          </div>
          <TicketForm />
        </div>
      </main>

      {/*  */}
    </div>
  );
}
