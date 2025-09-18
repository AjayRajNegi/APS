import { ArrowDownRight, CalendarHeart, Headset, Plane } from "lucide-react";
import Link from "next/link";

export function Save() {
  return (
    <section className="my-[80px] flex">
      <article className="flex w-[50%] flex-col justify-center">
        <p className="w-fit rounded-full border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-sm">
          Cheap Flights of APS
        </p>
        <p className="mt-[40px] mb-[10px] text-6xl font-medium">
          Sign in, <br />
          <span className="text-aps-400">save</span> money
        </p>
        <p className="font-medium text-[#a3a3a3]">
          Save money along with best - <br /> flight experiences.
        </p>
        <div className="mt-[40px] mb-[10px] flex w-fit items-center">
          <Link
            href="/"
            className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white shadow-2xl"
          >
            Booking Now
          </Link>

          <ArrowDownRight
            className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
            size={30}
          />
        </div>
      </article>
      <article className="grid w-[50%] grid-cols-2 gap-3">
        <div className="col-span-1 flex h-[300px] flex-col justify-center gap-2 rounded-4xl bg-stone-200 p-5">
          <CalendarHeart size={60} className="text-aps-400" />
          <p className="text-xl font-semibold text-shadow-2xs">
            Book your service now for <br /> hassle-free travelling
          </p>
        </div>
        <div className="col-span-1 flex h-[300px] flex-col justify-center gap-2 rounded-4xl bg-stone-200 p-5">
          <Plane size={60} className="text-aps-400" />
          <p className="mt-4 text-xl font-semibold text-shadow-2xs">
            15k+ successful services.
          </p>
          <p className="text-black/60">Happy customers throughout the world.</p>
        </div>
        <div className="bg-aps-200 col-span-2 flex h-[200px] items-center justify-center gap-[30%] rounded-4xl">
          <p className="text-2xl font-semibold">
            Trusted <span className="font-extrabold">24/7</span>{" "}
            <span className="text-gray-300">
              customer <br /> service
            </span>{" "}
            you can rely on.
          </p>
          <Headset className="text-gray-300" size={80} />
        </div>
      </article>
    </section>
  );
}
