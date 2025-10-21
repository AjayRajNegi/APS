import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowDownRight, Check } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Basic",
      price: "₹1,000*",
      period: "/person +GST",
      description:
        "Perfect for travelers who need smooth airport assistance at an affordable price.",
      features: [
        "Assistance with hand baggage",
        "Assistance with check-in baggage",
        "Airline check-in process support",
        "Post-customs baggage assist (Int. Arrivals)",
        "Escort from arrival hall to car park",
        "Escort till exit gate for departing passengers",
      ],
      standard: true,
    },
    {
      name: "Premium",
      price: "₹2,500*",
      period: "/person +GST",
      description:
        "Ideal for frequent flyers who want comfort, lounge access & faster processing.",
      features: [
        "Dedicated curbside meet & greet",
        "Golf cart / buggy facility (as per terminal)",
        "Complimentary porter",
        "Hand or check-in baggage",
        "Fast track airline check-in",
        "Immigration priority support (INTL)",
        "Security checks queue support",
        "Escort till lounge / boarding gate",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "₹4,000*",
      period: "/person +GST",
      description:
        "The ultimate luxury service with lounge, VIP car & rescheduling benefits.",
      features: [
        "All Premium benefits included",
        "Complimentary lounge access (2 hrs)",
        "One-time free rescheduling",
        "Immigration priority support (INTL)",
        "Full baggage & porter service",
        "Escort till lounge / boarding gate",
        "Personalized meet & greet assistance",
      ],
      premium: true,
    },
  ];

  return (
    <section className="relative w-full rounded-4xl bg-gradient-to-b from-[#000000] via-[#1a0000] to-[#e63b40] pb-[50px] text-white">
      {/* Section Heading */}
      <div className="mt-[100px] flex flex-col justify-between px-8 pt-[30px] md:flex-row">
        <p className="text-5xl font-[500] md:text-6xl">
          Your primary flight deals <br /> begin to feel left out.
        </p>
        <div className="mt-5 flex flex-col-reverse md:mt-0 md:block">
          <div className="mt-2 mb-[10px] flex w-fit items-center md:mt-4">
            <Link
              href="/"
              className="group border-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 p-4 px-6 py-2 font-medium shadow-md transition duration-300 ease-out"
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
              className="bg-aps-secondary-300 animate-bounce-y -z-0 -rotate-90 rounded-full p-1 text-white"
              size={30}
            />
          </div>
          <p className="w-fit">
            FInd the best porter deals and travel <br /> experiences at
            unbeatable prices.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto mt-16 flex w-[85%] flex-col gap-5 md:w-[90%] md:flex-row md:justify-center md:gap-0 lg:w-[70%]">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              `relative flex flex-1 flex-col rounded-2xl bg-gradient-to-b from-[#ACACAC33/20] to-[#D5D5D54D/30] p-8 pt-[60px] shadow-2xl ${
                tier.popular
                  ? "scale-110 border-[0.5px] border-red-500"
                  : "border-[0.5px] border-[#777777CC] transition-transform duration-300 hover:scale-105"
              }`,
              `${tier.standard ? "border-b-0 md:border-r-0 md:border-b-[0.5px]" : ""}`,
              `${tier.premium ? "border-t-0 md:border-t-[0.5px] md:border-l-0" : ""}`,
            )}
          >
            {/* Title */}
            <h3 className="mb-3 flex items-center gap-2 text-3xl font-semibold">
              {tier.name}
              {tier.popular && (
                <span className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold">
                  POPULAR
                </span>
              )}
            </h3>
            <p className="mb-6 text-sm text-gray-300">{tier.description}</p>

            {/* Price */}
            <p className="mb-6 text-4xl font-bold">
              {tier.price}
              <span className="text-base font-normal text-gray-400">
                {tier.period}
              </span>
            </p>
            <p className="mb-6 text-sm text-gray-400">
              Available at major airports across India
            </p>

            {/* Features */}
            <ul className="mb-8 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            {/* <Link
              href="#_"
              className="group border-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 p-4 px-6 py-3 font-medium shadow-md transition duration-300 ease-out"
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
                Get Started
              </span>
              <span className="invisible relative">Get Started</span>
            </Link> */}
          </div>
        ))}
      </div>
    </section>
  );
}
