import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowDownRight, Check } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Standard",
      price: "$999",
      period: "/mo",
      description:
        "Experience the excellence of our services with a handful of small projects.",
      features: [
        "One request at a time",
        "Two weeks design sprint",
        "Unlimited requests & revisions",
        "Up to 1 meeting per week",
        "Dev ready Figma files",
        "Unlimited Stock Photos",
      ],
      standard: true,
    },
    {
      name: "Premium",
      price: "$2,999",
      period: "/mo",
      description:
        "Ideal for burgeoning startups seeking continuous design assistance.",
      features: [
        "One request at a time",
        "3 - 5 business days delivery",
        "Unlimited requests & revisions",
        "Up to 1 meeting per week",
        "Dev ready Figma files",
        "Unlimited Stock Photos",
      ],
      popular: true,
    },
    {
      name: "Premium +",
      price: "$3,499",
      period: "/mo",
      description:
        "Ideal choice for agencies that are committed to providing top-notch service to their clients.",
      features: [
        "Two requests at a time",
        "3 - 5 business days delivery",
        "Unlimited requests & revisions",
        "Flexible weekly meetings",
        "Dev ready Figma files",
        "Unlimited Stock Photos",
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
              className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white shadow-2xl"
            >
              Booking Now
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
              <span className="text-lg font-normal text-gray-400">
                {tier.period}
              </span>
            </p>
            <p className="mb-6 text-sm text-gray-400">
              Pause or cancel anytime. <br /> 7 days money-back guarantee
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
            <button className="bg-aps-secondary-500 mt-auto w-fit rounded-full px-4 py-2 font-semibold text-white transition hover:opacity-90">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
