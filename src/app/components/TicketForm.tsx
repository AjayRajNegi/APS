"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const tabs = ["Domestic", "International", "Transit"];
export function TicketForm() {
  const [activeTab, setActiveTab] = useState("Domestic");

  return (
    <div className="w-full max-w-5xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-4 shadow-xl md:p-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border-[1px] px-4 py-2 text-sm font-medium shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow transition-transform duration-300 hover:scale-95 hover:shadow-none ${
                activeTab === tab
                  ? "bg-aps-secondary-400 text-white"
                  : "bg-aps-secondary-200 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <select className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
            <option>Country</option>
          </select>

          <select className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
            <option>Services</option>
          </select>

          <select className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
            <option>Origin Airport</option>
          </select>

          <input
            type="text"
            placeholder="Destination Airport"
            className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
          />

          <select className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
            <option>Terminal</option>
          </select>

          <input
            type="date"
            className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="flex-1 rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
          />

          <button
            type="submit"
            className="group from-aps-secondary-500 to-aps-secondary-300 flex items-center justify-center gap-1 rounded-full border-[1px] border-white bg-gradient-to-r py-3 font-medium transition duration-300 hover:border-[1px] md:col-span-2"
          >
            <p className="transition-transform duration-300 group-hover:-translate-x-[10px] group-hover:text-white">
              Book Now
            </p>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-[10px] group-hover:text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
