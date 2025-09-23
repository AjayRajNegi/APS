import Link from "next/link";
import Pricing from "./components/Pricing";
import { TicketForm } from "./components/TicketForm";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { BlogsShowcase } from "./components/BlogsShowcase";
import { AirportSection } from "./components/AirportSection";
import { FullWidthComponent } from "./components/FullWidthComponent";
import { CarRental } from "./components/CarRental";
import Image from "next/image";
import AirportsList from "./components/AirportList";

export default function Home() {
  return (
    <div className="font-poppins">
      {/* Main Section */}
      <main className="relative flex h-[min(calc(max(85vh,650px)),800px)] w-full items-end overflow-hidden rounded-4xl">
        <Image
          src="/mainImage.png"
          alt="Flight booking background"
          priority
          fill
          quality={80}
          placeholder="blur"
          blurDataURL="/blur.webp"
          className="absolute inset-0 z-10 object-cover object-[center_70%]"
        />
        <div className="relative z-20 flex w-full flex-col justify-between p-4 lg:flex-row">
          <div className="flex flex-col justify-end pb-5 lg:w-1/5 lg:pb-0">
            <p className="leading-tight text-white">
              Find and book the best flights quickly. Compare prices, select
              your airline, and book with confidence-all in one place.
            </p>
            <div className="mt-4 flex items-center shadow-2xl">
              <Link
                href="/"
                className="bg-aps-secondary-300 border-aps-secondary-400 rounded-full border-[1px] px-3 py-2 text-white text-shadow-xs"
              >
                Booking Now
              </Link>

              <ArrowDownRight
                className="bg-aps-secondary-300 border-aps-secondary-400 animate-bounce-y -z-0 -rotate-90 rounded-full border-[1px] p-1 text-white"
                size={30}
              />
            </div>
          </div>
          <TicketForm />
        </div>
      </main>

      {/* Pricing Section */}
      <FullWidthComponent>
        <article className="mt-[100px]">
          {/* Section 1 */}
          <div className="flex flex-col items-center">
            <p className="w-fit rounded-full border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-xs md:text-sm">
              Cheap Flights of APS
            </p>
            <h1 className="mt-[30px] w-[85%] max-w-[1000px] text-center text-3xl font-semibold md:w-[55%] md:text-4xl">
              APS makes finding and booking cheap, premium porters simple and
              fast. We offer great{" "}
              <span className="bg-aps-600 inline-block -rotate-6 rounded-full px-3 py-1 text-xl md:text-2xl">
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

          <FullWidthComponent>
            <Pricing />
          </FullWidthComponent>
        </article>
      </FullWidthComponent>

      {/* Car Rental Section */}
      <CarRental />

      {/* Blogs Section */}
      <article className="mt-[100px]">
        <h1 className="mx-auto mb-[80px] w-fit px-4 text-center text-4xl font-semibold tracking-tight text-shadow-xs md:text-6xl">
          Our tour package guarantees a <br /> smooth and unforgettable
          adventure.
        </h1>
        <div>
          {/* <BlogsSection /> */}
          <BlogsShowcase href="blog/" />
        </div>
      </article>

      {/* Airport Section */}
      <article className="mt-[80px]">
        <h1 className="mx-auto mb-[40px] w-fit text-center text-6xl font-bold tracking-tight text-shadow-xs">
          Top Airports.
        </h1>
        <AirportSection />
      </article>
      {/* All Airports Section */}
      <article className="mb-[50px] rounded-4xl border-[1px] border-neutral-500 shadow-[5px_5px_0px_0px_rgba(1,1,1)] transition-shadow duration-300 hover:shadow-none">
        <AirportsList />
      </article>
    </div>
  );
}
