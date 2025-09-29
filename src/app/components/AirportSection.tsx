"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";

interface Airport {
  id: number;
  name: string;
  code: string;
  country: string;
  city: string;
  location: string;
  short_description: string;
  description: string;
  image_path: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export function AirportSection() {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/country`)
      .then((res) => res.json())
      .then((data: string[]) => setCountries(data));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/airport/${selectedCountry}`,
    )
      .then((res) => res.json())
      .then((data: Airport[]) => setAirports(data))
      .finally(() => setLoading(false));
  }, [selectedCountry]);

  return (
    <div className="mb-[60px]">
      {/* Country Section */}
      <div className="flex justify-center gap-4 md:gap-5">
        {countries.map((country) => (
          <p
            key={country}
            className={cn(
              "w-fit cursor-pointer rounded-lg px-3 py-2 text-base shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow transition-transform duration-300 hover:scale-95 hover:shadow-none",
              selectedCountry === country
                ? "bg-aps-secondary-300 text-white"
                : "bg-gray-100",
            )}
            onClick={() => setSelectedCountry(country)}
          >
            {country}
          </p>
        ))}
      </div>

      {/* Airport Section */}
      <div className="mt-[20px] grid h-[600px] grid-cols-4 grid-rows-4 gap-1 md:mt-[50px] md:h-[400px] md:grid-rows-2 md:gap-2 lg:gap-4">
        {loading ? (
          <p>Loading airports...</p>
        ) : airports.length === 0 ? (
          <p>No airports found for {selectedCountry}</p>
        ) : (
          <>
            {airports.map((airport, idx) =>
              idx === 0 ? (
                <Link
                  href={`/airports/${airport.id}`}
                  key={airport.id}
                  className="col-span-4 row-span-3 flex items-end justify-between rounded-2xl border-[1px] border-neutral-500 p-4 transition-shadow duration-300 hover:shadow-none md:col-span-2 md:row-span-2 md:shadow-[5px_5px_0px_0px_rgba(1,1,1)]"
                  style={{
                    backgroundImage: `url(/mainImage.png)`,
                  }}
                >
                  <div>
                    <p className="text-4xl font-bold text-white">
                      {airport.location}
                    </p>
                    <p className="font-bold text-gray-300">{airport.name}</p>
                  </div>
                  <ArrowDownRight
                    className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                    size={40}
                  />
                </Link>
              ) : (
                <Link
                  href={`/airports/${airport.id}`}
                  key={airport.id}
                  className="bg-aps-100 col-span-2 row-span-1 flex items-end justify-between rounded-2xl border-[1px] border-neutral-500 p-2 shadow-[1.5px_1.5px_0px_0px_rgba(1,1,1)] transition-shadow duration-300 hover:shadow-none md:col-span-1 md:row-span-1 md:shadow-[3px_3px_0px_0px_rgba(1,1,1)] lg:p-4"
                  style={{
                    backgroundImage: `url('${airport.image_path ?? "mainImage.png"}')`,
                  }}
                >
                  <div>
                    <p className="text-lg font-bold text-white lg:text-2xl">
                      {airport.location}
                    </p>
                    <p className="w-[80%] text-xs font-bold text-gray-300 lg:text-lg">
                      {airport.name}
                    </p>
                  </div>
                  <ArrowDownRight
                    className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                    size={25}
                  />
                </Link>
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
}
