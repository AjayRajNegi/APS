"use client";
import Image from "next/image";
import { useState } from "react";
import { Car, CreditCard, Plane, ArrowDownRight } from "lucide-react";
import DateTimePicker from "./DateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export function CarRental() {
  const [activeTab, setActiveTab] = useState("cars");
  return (
    <section className="mt-[100px] h-[90vh] w-full rounded-4xl">
      {/* Top Section */}
      <article className="relative h-[85%] w-full overflow-hidden rounded-t-4xl md:h-[75%]">
        <Image
          src="/carImage.webp"
          objectPosition="center 70%"
          objectFit="cover"
          fill
          alt="asdfa"
        />
        <div className="absolute -top-[4.5%] left-1/2 w-full -translate-x-[50%]">
          <div className="mx-auto mt-10 max-w-[95%] rounded-3xl bg-white p-3 shadow-lg md:max-w-[80%] md:p-4 lg:max-w-6xl">
            {/* Tabs */}
            <div className="mb-3 flex flex-wrap gap-2 md:mb-6">
              <button
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition ${
                  activeTab === "cars"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("cars")}
              >
                <Car size={18} /> Cars
              </button>
              <button
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition ${
                  activeTab === "subscription"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("subscription")}
              >
                <CreditCard size={18} /> Subscription
              </button>
            </div>

            {/* Form */}
            <div className="flex flex-wrap items-end justify-between gap-3 md:gap-6">
              {/* Location Input */}
              <div className="flex flex-wrap items-end gap-2">
                <div>
                  <label className="text-sm font-medium">
                    Pick-up & return
                  </label>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3">
                    <Plane className="text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Frankfurt Airport"
                      className="w-48 border-none bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <button className="text-sm font-medium text-gray-500 hover:underline">
                  + Different return location
                </button>
              </div>

              {/* Date Pickers */}
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-0 md:gap-2">
                  <label className="text-sm font-medium">Pick-up date</label>
                  <DateTimePicker />
                </div>

                <div className="flex flex-col gap-0 md:gap-2">
                  <label className="text-sm font-medium">Return date</label>
                  <DateTimePicker />
                </div>
              </div>

              {/* Submit Button */}
              <button className="group relative inline-block text-base">
                <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-gray-900 px-5 py-3 leading-tight font-medium text-gray-800 transition-colors duration-300 ease-out group-hover:text-white">
                  <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
                  <span className="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-gray-900 transition-all duration-300 group-hover:-rotate-180"></span>
                  <span className="relative">Book Now</span>
                </span>
                <span
                  className="absolute right-0 bottom-0 -mr-1 -mb-1 h-12 w-full rounded-lg bg-gray-900 transition-all duration-200 ease-linear group-hover:mr-0 group-hover:mb-0"
                  data-rounded="rounded-lg"
                ></span>
              </button>
            </div>

            {/* Dialog */}

            <Dialog>
              <DialogTrigger className="mt-1 text-sm font-semibold underline underline-offset-2 md:mt-2">
                Apply corporate rate
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>USE CORPORATE RATE</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                  <button className="mt-4 flex items-center shadow-2xl">
                    <Link
                      href="/"
                      className="bg-aps-secondary-300 border-aps-secondary-400 rounded-full border-[1px] px-3 py-2 text-white text-shadow-xs"
                    >
                      Booking Now
                    </Link>

                    <ArrowDownRight
                      className="bg-aps-secondary-300 border-aps-secondary-400 -z-0 -rotate-90 rounded-full border-[1px] p-1 text-white"
                      size={30}
                    />
                  </button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </article>
      {/* Bottom Section */}
      <div className="rounded-b-4xl bg-black">
        <article className="via-aps-500 h-fit bg-gradient-to-r from-black to-white bg-clip-text py-6 text-center text-4xl font-bold text-transparent text-shadow-2xs md:text-6xl">
          <p className="">
            RENT MOST PREMIUM <br /> CARS AVAILABLE.
          </p>
          <p className="mt-1 text-xs md:text-sm">
            Premium car rental at affordable rates. Worldwide.
          </p>
        </article>
      </div>
    </section>
  );
}
