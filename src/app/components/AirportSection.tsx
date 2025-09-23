"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArrowDownRight } from "lucide-react";

const Country = ["Canada", "India", "UAE", "USA"];
const airport = [
  {
    id: 1,
    title: "Indira Gandhi International Airport",
    location: "Delhi",
    imageUrl: "/mainImage.png",
    slug: "1",
  },
  {
    id: 2,
    title: "Chhatrapati Shivaji Maharaj Airport",
    location: "Mumbai",
    imageUrl: "/mainImage.png",
    slug: "2",
  },
  {
    id: 3,
    title: "Rajiv Gandhi International Airport",
    location: "Hyderabad",
    imageUrl: "/mainImage.png",
    slug: "3",
  },
  {
    id: 4,
    title: "Cochin International Airport",
    location: "Cochin",
    imageUrl: "/mainImage.png",
    slug: "4",
  },
  {
    id: 5,
    title: "Chennai International Airport",
    location: "Chennai",
    imageUrl: "/mainImage.png",
    slug: "5",
  },
];

export function AirportSection() {
  const [cat, setCat] = useState("Canada");
  return (
    <div className="mb-[60px]">
      {/* Country Section */}
      <div className="flex justify-center gap-4 md:gap-5">
        {Country.map((Country) => (
          <p
            key={Country}
            className={cn(
              "w-fit cursor-pointer rounded-full px-3 py-2 text-base shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow transition-transform duration-300 hover:scale-95 hover:shadow-none",
              `${cat === Country ? "bg-aps-secondary-300 text-white" : "bg-gray-100"}`,
            )}
            onClick={() => setCat(Country)}
          >
            {Country}
          </p>
        ))}
      </div>
      {/* Airport Section */}
      <div className="mt-[20px] grid h-[600px] grid-cols-4 grid-rows-4 gap-1 md:mt-[50px] md:h-[400px] md:grid-rows-2 md:gap-2 lg:gap-4">
        {airport.map((airport, idx) =>
          idx === 0 ? (
            <Link
              href={`/airports/${airport.slug}`}
              key={airport.id}
              className="bg-aps-100 col-span-4 row-span-3 flex items-end justify-between rounded-2xl border-[1px] border-neutral-500 p-4 shadow-[5px_5px_0px_0px_rgba(1,1,1)] transition-shadow duration-300 hover:shadow-none md:col-span-2 md:row-span-2"
              style={{
                backgroundImage: `url('${airport.imageUrl}')`,
              }}
            >
              <div>
                <p className="text-4xl font-bold text-white">
                  {airport.location}
                </p>
                <p className="font-bold text-gray-300">{airport.title}</p>
              </div>
              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={40}
              />
            </Link>
          ) : (
            <Link
              href={`/airports/${airport.slug}`}
              key={airport.id}
              className="bg-aps-100 col-span-2 row-span-1 flex items-end justify-between rounded-2xl border-[1px] border-neutral-500 p-2 shadow-[5px_5px_0px_0px_rgba(1,1,1)] transition-shadow duration-300 hover:shadow-none md:col-span-1 md:row-span-1 lg:p-4"
              style={{
                backgroundImage: `url('${airport.imageUrl}')`,
              }}
            >
              <div>
                <p className="text-lg font-bold text-white lg:text-2xl">
                  {airport.location}
                </p>
                <p className="w-[80%] text-xs font-bold text-gray-300 lg:text-lg">
                  {airport.title}
                </p>
              </div>
              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={25}
              />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
