"use client";

import { useState } from "react";

const tabs = ["Domestic", "International", "Transit"];

export function TicketForm() {
  const [activeTab, setActiveTab] = useState("Domestic");

  return (
    <div className="w-full max-w-5xl text-black">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 p-6 shadow-xl">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
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
            className="bg-aps-secondary-200 hover:bg-aps-secondary-400 rounded-full py-3 font-medium transition md:col-span-2"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
