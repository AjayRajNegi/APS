import Image from "next/image";
import { AirportSection } from "@/app/components/AirportSection";

async function getAirport(slug: string) {
  console.log(slug);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/airport/country/${slug}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    console.log("asdfas");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function IndividualAirportsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const airport = await getAirport(slug);

  if (!airport) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <article className="my-[50px] flex max-w-[1500px] flex-col items-center bg-[#f7f9fa]">
        <h1 className="w-[90%] text-center text-4xl font-semibold tracking-tight text-shadow-2xs md:w-[65%] md:text-5xl">
          {airport.name}
        </h1>
        <h4 className="my-[30px] w-[95%] text-center text-black/60 md:w-[80%]">
          {airport.short_description}
        </h4>
        <div className="relative h-[min(calc(100vh/2),500px)] w-full overflow-hidden rounded-4xl [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_60%,black)]">
          <Image src="/mainImage.png" fill alt="asf" quality={10} />
          <div className="absolute bottom-[4%] left-[4%] flex gap-6 text-white">
            <p className="text-shadow-2xs">
              Published: {new Date(airport.created_at).toLocaleDateString()}
            </p>
            <p className="text-shadow-2xs">
              IATA CODE: <span className="text-black">{airport.code}</span>
            </p>
          </div>
        </div>
        {airport.description}
      </article>
      <h1 className="mx-auto mb-[30px] w-fit text-center text-6xl font-semibold tracking-tight text-shadow-xs">
        Top Airports.
      </h1>
      <AirportSection />
    </>
  );
}
