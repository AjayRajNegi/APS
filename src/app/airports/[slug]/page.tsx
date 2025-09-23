import Image from "next/image";
import { AirportSection } from "@/app/components/AirportSection";

export default async function IndividualAirportsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <article className="my-[50px] flex max-w-[1500px] flex-col items-center">
        <h1 className="w-[90%] text-center text-4xl font-semibold tracking-tight text-shadow-2xs md:w-[65%] md:text-5xl">
          How to Book a Porter Service at Vancouver Airport (YVR): A
          Step-by-Step Guide {slug}
        </h1>
        <h4 className="my-[30px] w-[95%] text-center text-black/60 md:w-[80%]">
          Navigating a busy airport alone is tough. Our simple guide explains
          how to easily pre-book Vancouver airport baggage help, where to meet
          your porter, and what to expect for a stress-free start to your
          journey.
        </h4>
        <div className="relative h-[min(calc(100vh/2),500px)] w-full overflow-hidden rounded-4xl [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_60%,black)]">
          <Image src="/mainImage.png" fill alt="asf" quality={10} />
          <div className="absolute bottom-[4%] left-[4%] flex gap-6 text-white">
            <p className="text-shadow-2xs">Published: Sep 20, 2025</p>
            <p className="text-shadow-2xs">Category: Design</p>
          </div>
        </div>
      </article>
      <h1 className="mx-auto mb-[30px] w-fit text-center text-6xl font-semibold tracking-tight text-shadow-xs">
        Top Airports.
      </h1>
      <AirportSection />
    </>
  );
}
