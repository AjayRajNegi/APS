import { ChevronRight } from "lucide-react";

const airports = [
  { name: "Indira Gandhi International Airport (Terminal 1)", location: "DEL" },
  { name: "Indira Gandhi International Airport (Terminal 3)", location: "DEL" },
  { name: "Kempegowda International Airport (Terminal 1)", location: "BLR" },
  { name: "Kempegowda International Airport (Terminal 2)", location: "BLR" },
  { name: "Chennai International Airport", location: "MAA" },
  { name: "Cochin International Airport", location: "COK" },
  { name: "Netaji Subhas Chandra Bose International Airport", location: "CCU" },
  { name: "Sardar Vallabhbhai Patel International Airport", location: "AMD" },
  { name: "Goa International Airport", location: "GOX" },
  { name: "Rajiv Gandhi International Airport", location: "HYD" },
  { name: "Chaudhary Charan Singh International Airport", location: "LKO" },
  { name: "Dehradun Airport (Jolly Grant Airport)", location: "DED" },
  { name: "Swami Vivekananda Airport", location: "RPR" },
  {
    name: "Chhatrapati Shivaji Maharaj International Airport",
    location: "BOM",
  },
  { name: "Dabolim Airport (Goa International Airport)", location: "GOI" },
  { name: "Chandigarh International Airport", location: "IXC" },
  { name: "Jammu Airport", location: "IXJ" },
  { name: "Srinagar Airport", location: "SXR" },
  { name: "Shirdi International Airport", location: "SAG" },
  { name: "Mangaluru International Airport", location: "IXE" },
  { name: "Thiruvananthapuram International Airport", location: "TRV" },
  { name: "Dubai International Airport (Terminal 1)", location: "DXB" },
  { name: "Dubai International Airport (Terminal 2)", location: "DXB" },
  { name: "Dubai International Airport (Terminal 3)", location: "DXB" },
  { name: "Al Maktoum International Airport", location: "DWC" },
  { name: "Sharjah International Airport", location: "SHJ" },
  { name: "Hamad International Airport", location: "DOH" },
  { name: "Suvarnabhumi International Airport", location: "BKK" },
  { name: "Phuket International Airport", location: "HKT" },
  { name: "Paris Charles de Gaulle Airport", location: "CDG" },
  { name: "Heathrow Airport", location: "LHR" },
  { name: "Singapore Changi Airport", location: "SIN" },
  { name: "Toronto Pearson International Airport", location: "YYZ" },
  { name: "Vancouver International Airport", location: "YVR" },
  {
    name: "Montréal-Pierre Elliott Trudeau International Airport",
    location: "YUL",
  },
  { name: "London Gatwick Airport", location: "LGW" },
  { name: "Istanbul Airport", location: "IST" },
  { name: "Frankfurt Airport", location: "FRA" },
  { name: "Hong Kong International Airport", location: "HKG" },
  { name: "Colombo International Airport", location: "CMB" },
];

export default function AirportsList() {
  return (
    <section className="mx-auto max-w-7xl px-3 py-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Popular Airports & Travel Services
        </h2>
        <div className="mx-auto mt-2 mb-4 h-1 w-16 rounded bg-red-600"></div>
        <p className="text-gray-600">
          Explore leading airports and premium travel services for a smooth,
          hassle-free journey.
        </p>
      </div>

      {/* Grid layout */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {airports.map((airport, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 rounded-md px-1 py-[2px] text-gray-800 transition-shadow duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <ChevronRight className="h-4 w-4 text-neutral-500" />
            <span className="text-[10px] text-neutral-500">
              {airport.name} <b className="text-black">{airport.location}</b>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
