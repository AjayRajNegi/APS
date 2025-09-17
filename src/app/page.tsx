import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { TicketForm } from "./components/TicketForm";
import Image from "next/image";
import { BlogsSection } from "./components/BlogsSection";
import { AirportSection } from "./components/AirportSection";

export default function Home() {
  return (
    <div>
      {/* Main Section */}
      <main
        className="bg-aps-200 flex h-[85vh] w-full items-end rounded-4xl"
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
          <TicketForm />
        </div>
      </main>

      {/* Flight Details */}
      <article className="mt-[90px]">
        {/* Section 1 */}
        <div className="flex flex-col items-center">
          <p className="w-fit rounded-full border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-sm">
            Cheap Flights of APS
          </p>
          <h1 className="mt-[30px] w-[55%] max-w-[1000px] text-center text-4xl font-semibold">
            APS makes finding and booking cheap, premium porters simple and
            fast. We offer great{" "}
            <span className="bg-aps-600 inline-block -rotate-6 rounded-full px-3 py-1 text-2xl">
              Discounts
            </span>{" "}
            on
            <span className="text-aps-400">
              {" "}
              one-way, return, International, and multi-city trips.
            </span>
          </h1>
        </div>
        {/* Section 2 */}
        <div className="mt-[60px] flex justify-between">
          <p className="text-6xl font-[500]">
            Your primary flight deals <br /> begin to feel left out.
          </p>
          <div>
            <div className="mt-4 mb-[10px] flex w-fit items-center">
              <Link
                href="/"
                className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white shadow-2xl"
              >
                Booking Now
              </Link>

              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={30}
              />
            </div>
            <p className="w-fit">
              FInd the best porter deals and travel <br /> experiences at
              unbeatable prices.
            </p>
          </div>
        </div>
        {/* Section 3 */}
        <div className="mt-[50px] grid grid-cols-4 gap-[10px] tracking-tight">
          <div className="relative col-span-2 h-[400px] overflow-hidden rounded-4xl bg-white [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_60%,black)]">
            <Image src="/mainImage.png" alt="1" fill />
            <div className="absolute top-[11%] left-[2%] flex -translate-y-1/2 gap-2 rounded-full bg-white px-4 py-2">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={40}
              />
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="bg-aps-200 relative col-span-1 h-[400px] overflow-hidden rounded-4xl [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_60%,black)]">
            <Image src="/mainImage.png" alt="1" fill objectFit="cover" />
          </div>
          <div className="bg-aps-300 relative col-span-1 h-[400px] overflow-hidden rounded-4xl [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_60%,black)]">
            <Image src="/mainImage.png" alt="1" fill objectFit="cover" />
          </div>
        </div>
      </article>

      {/* Blogs Section */}
      <article className="mt-[80px]">
        <h1 className="mx-auto mb-[50px] w-fit text-center text-6xl font-semibold tracking-tight text-shadow-xs">
          Our tour package guarantees a <br /> smooth and unforgettable
          adventure.
        </h1>
        <div>
          <BlogsSection />
        </div>
      </article>

      {/* Airport Section */}
      <article className="mt-[80px]">
        <h1 className="mx-auto mb-[50px] w-fit text-center text-6xl font-semibold tracking-tight text-shadow-xs">
          Top Airports.
        </h1>

        <AirportSection />
      </article>
    </div>
  );
}
