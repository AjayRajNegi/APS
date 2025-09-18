"use client";
import { cn } from "../lib/cn";
import { useState } from "react";
import { ArrowDownRight } from "lucide-react";

const Country = ["Canada", "India", "UAE", "USA"];
const airport = [
  {
    id: 1,
    title: "Indira Gandhi International Airport",
    location: "Delhi",
    imageUrl: "/mainImage.png",
  },
  {
    id: 2,
    title: "Chhatrapati Shivaji Maharaj Airport",
    location: "Mumbai",
    imageUrl: "/mainImage.png",
  },
  {
    id: 3,
    title: "Rajiv Gandhi International Airport",
    location: "Hyderabad",
    imageUrl: "/mainImage.png",
  },
  {
    id: 4,
    title: "Cochin International Airport",
    location: "Cochin",
    imageUrl: "/mainImage.png",
  },
  {
    id: 5,
    title: "Chennai International Airport",
    location: "Chennai",
    imageUrl: "/mainImage.png",
  },
];

export function AirportSection() {
  const [cat, setCat] = useState("Canada");
  return (
    <div className="mb-[100px]">
      {/* Country Section */}
      <div className="flex justify-center gap-5">
        {Country.map((Country) => (
          <p
            key={Country}
            className={cn(
              "w-fit cursor-pointer rounded-full px-3 py-2 text-base",
              `${cat === Country ? "bg-aps-secondary-300 text-white" : "bg-gray-100"}`,
            )}
            onClick={() => setCat(Country)}
          >
            {Country}
          </p>
        ))}
      </div>
      {/* Blogs Section */}
      <div className="mt-[50px] grid h-[400px] grid-cols-4 grid-rows-2 gap-4">
        {airport.map((airport, idx) =>
          idx === 0 ? (
            <div
              key={airport.id}
              className="bg-aps-100 col-span-2 row-span-2 flex items-end justify-between rounded-2xl p-4"
              style={{ backgroundImage: `url('${airport.imageUrl}')` }}
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
            </div>
          ) : (
            <div
              key={airport.id}
              className="bg-aps-100 col-span-1 flex items-end justify-between rounded-2xl p-4"
              style={{ backgroundImage: `url('${airport.imageUrl}')` }}
            >
              <div>
                <p className="text-2xl font-bold text-white">
                  {airport.location}
                </p>
                <p className="text-sm font-bold text-gray-300">
                  {airport.title}
                </p>
              </div>
              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={30}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
