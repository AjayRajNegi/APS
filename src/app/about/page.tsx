import Image from "next/image";
import { FAQ } from "../components/FAQ";
import { Save } from "../components/Save";
import { ArrowDownRight } from "lucide-react";
import { TextEffect } from "../components/TextEffect";

export default function About() {
  return (
    <div className="font-poppins">
      {/* Hero section */}
      <section className="my-[40px] w-full">
        <article>
          <div className="mb-10 flex items-end text-7xl font-semibold tracking-tight text-shadow-2xs">
            <p>
              OUR <br /> STORY
              <span className="ml-1 inline-block h-3 w-3 animate-pulse rounded-full bg-black"></span>
            </p>
          </div>
        </article>
        <article className="flex w-full gap-8">
          <div className="relative h-[calc(100vh/1.15)] w-[70%] overflow-hidden rounded-4xl border-[1px] border-black transition-shadow duration-300 hover:shadow-[5px_5px_0px_0px_rgba(1,1,1)]">
            <Image src="/mainImage.png" fill alt="asdaf" objectFit="cover" />
            <div className="absolute bottom-[0] left-0 h-fit w-[45%] max-w-[500px] rounded-4xl bg-white p-4 text-justify">
              <TextEffect per="char" preset="fade" className="text-justify">
                The company operates at airports in Toronto, Vancouver,
                Montreal, Calgary, Edmonton, Ottawa, Winnipeg, and Halifax,
                ensuring a smooth beginning and end for travelers.
              </TextEffect>

              <p className="mt-4 flex items-center gap-1 text-lg font-medium underline underline-offset-8">
                <span>All Airports</span>
                <ArrowDownRight
                  className="animate-bounce-x -rotate-90"
                  size={20}
                />
              </p>
            </div>
          </div>
          <div className="flex h-[calc(100vh/1.15)] w-[30%] flex-col justify-between">
            <TextEffect
              per="word"
              as="h3"
              preset="blur"
              className="text-justify"
            >
              Airport Porter Service Canada was founded to provide a reliable
              and efficient solution for travelers, families, seniors,
              businesspeople, and passengers with disabilities at Canada&apos;s
              airports. The coast-to-coast service has gained the trust of
              thousands of Canadians, with a trained staff of porters who are
              thoroughly screened and equipped with excellent customer service
              and airport safety standards training.
            </TextEffect>

            <div className="bg-aps-200 mt-8 h-full w-full rounded-4xl transition-shadow duration-300 hover:shadow-[5px_5px_0px_0px_rgba(1,1,1)]"></div>
          </div>
        </article>
      </section>

      {/* Section 1 */}
      <section className="mt-[120px] flex">
        <article className="w-[30%]">Our Story</article>
        <article className="w-[70%]">
          <div>
            <h1 className="text-6xl font-medium tracking-tight">
              From the Coastline to the <br /> World - Our Journey Begins
            </h1>
          </div>
          <div className="mt-[100px]">
            <div className="mb-[100px] flex">
              <p className="w-1/2 text-2xl font-semibold">Our Vision</p>
              <p className="w-1/2 text-[#807e7e]">
                To redefine the travel norm within Canada by equipping
                personalized airport assistance as a necessary and inclusive
                component of all travel.
              </p>
            </div>
            <div className="mb-[100px] flex">
              <p className="w-1/2 text-2xl font-semibold">Our Mission</p>
              <p className="w-1/2 text-[#807e7e]">
                Our mission is to deliver effortless and dignified travel
                experiences through professional, pre-arranged porter and
                assistance services at every major Canadian airport.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Section 2 */}
      <FAQ />

      {/* Save Section */}
      <Save />
    </div>
  );
}
