import { Plane } from "lucide-react";
import { AirportSection } from "../components/AirportSection";

export default function AirportsPage() {
  return (
    <>
      {/* Hero Section */}
      <article className="my-[50px] flex w-full flex-col items-center">
        <p className="flex w-fit items-center gap-0.5 rounded-lg border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-sm">
          <Plane size={15} /> Airports
        </p>
        <h1 className="my-[30px] text-center text-6xl font-semibold tracking-tight">
          All Information on Airports
        </h1>
        <p className="text-center text-black/60">
          A collection of hand-picked articles. Deep dives, insights, and <br />
          honest advice to navigate our ecosystem.
        </p>
      </article>
      <h1 className="mx-auto mb-[50px] w-fit text-center text-6xl font-semibold tracking-tight text-shadow-xs">
        Top Airports.
      </h1>
      <AirportSection />
    </>
  );
}
