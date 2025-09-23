import Link from "next/link";
import Pricing from "./components/Pricing";
import { TicketForm } from "./components/TicketForm";
import { ArrowDownRight } from "lucide-react";
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
      <main className="animate-fade-up relative flex h-[min(calc(max(85vh,650px)),800px)] w-full items-end overflow-hidden rounded-4xl">
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
              your airline, and book with confidence—all in one place.
            </p>

            <div className="mt-4 flex items-center shadow-2xl">
              <Link
                href="#_"
                className="group border-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-6 py-2 font-medium shadow-md transition duration-300 ease-out"
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
              <span className="bg-aps-600 inline-block -rotate-6 rounded-full px-3 py-1 text-xl text-white md:text-2xl">
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
