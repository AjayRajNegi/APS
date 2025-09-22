import { ArrowDownRight, CalendarHeart, Headset, Plane } from "lucide-react";
import Link from "next/link";

export function Save() {
  return (
    <section className="my-[80px] flex flex-col gap-10 lg:flex-row lg:gap-0">
      <article className="flex w-full flex-col items-center justify-center text-center lg:w-[50%] lg:items-start lg:text-start">
        <p className="w-fit rounded-full border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-sm">
          Cheap Flights of APS
        </p>
        <p className="mt-[40px] mb-[10px] hidden text-6xl font-medium lg:block">
          Sign in, <br />
          <span className="text-aps-400">save</span> money
        </p>
        <p className="mt-[40px] mb-[10px] text-6xl font-medium lg:hidden">
          Sign in,
          <span className="text-aps-400">save</span> money
        </p>
        <p className="font-medium text-[#a3a3a3]">
          Save money along with best - <br /> flight experiences.
        </p>
        <div className="mt-[10px] mb-[10px] flex w-fit items-center lg:mt-[40px]">
          <Link
            href="/"
            className="bg-aps-secondary-300 rounded-full px-3 py-2 text-white shadow-2xl"
          >
            Booking Now
          </Link>

          <ArrowDownRight
            className="bg-aps-secondary-300 animate-bounce-y -z-0 -rotate-90 rounded-full p-1 text-white"
            size={30}
          />
        </div>
      </article>
      <article className="grid w-full gap-2 sm:grid-cols-2 lg:w-1/2 lg:gap-6">
        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-stone-100 p-6 shadow-md transition hover:shadow-xl">
          <CalendarHeart size={56} className="text-aps-400" />
          <p className="text-lg font-semibold sm:text-xl">
            Book your service now for hassle-free travelling
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-stone-100 p-6 shadow-md transition hover:shadow-xl">
          <Plane size={56} className="text-aps-400" />
          <p className="text-lg font-semibold sm:text-xl">
            15k+ successful services.
          </p>
          <p className="text-sm text-gray-600">
            Happy customers throughout the world.
          </p>
        </div>

        <div className="bg-aps-200 col-span-1 flex flex-col items-center justify-between gap-6 rounded-3xl p-6 text-center shadow-md transition hover:shadow-xl sm:col-span-2 sm:flex-row sm:text-left">
          <p className="text-xl leading-snug font-semibold sm:text-2xl">
            Trusted <span className="font-extrabold">24/7</span>{" "}
            <span className="text-aps-400">
              customer <br className="hidden sm:block" /> service
            </span>{" "}
            you can rely on.
          </p>
          <Headset className="text-aps-400" size={72} />
        </div>
      </article>
    </section>
  );
}
