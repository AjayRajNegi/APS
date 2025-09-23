import Link from "next/link";
import { ArrowDownRight, CalendarHeart, Headset, Plane } from "lucide-react";

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
            href="/managebookings"
            className="group bg-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-8 py-2.5 font-medium text-black shadow-md transition duration-300 ease-out"
          >
            <span className="ease text-aps-secondary-300 absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-white duration-300 group-hover:translate-x-0">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
              Manage Bookings
            </span>
            <span className="invisible relative">Button Text</span>
          </Link>

          <ArrowDownRight
            className="bg-aps-secondary-300 animate-bounce-y border-aps-secondary-400 -z-0 -rotate-90 rounded-full border-[1px] p-1 text-white"
            size={30}
          />
        </div>
      </article>
      <article className="grid w-full gap-2 sm:grid-cols-2 lg:w-1/2 lg:gap-6">
        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-stone-100 p-6 shadow-lg transition hover:shadow-none">
          <CalendarHeart size={56} className="text-aps-400" />
          <p className="text-lg font-semibold sm:text-xl">
            Book your service now for hassle-free travelling
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-stone-100 p-6 shadow-lg transition hover:shadow-none">
          <Plane size={56} className="text-aps-400" />
          <p className="text-lg font-semibold sm:text-xl">
            15k+ successful services.
          </p>
          <p className="text-sm text-gray-600">
            Happy customers throughout the world.
          </p>
        </div>

        <div className="bg-aps-200 col-span-1 flex flex-col items-center justify-between gap-6 rounded-3xl p-6 text-center shadow-xl transition hover:shadow-none sm:col-span-2 sm:flex-row sm:text-left">
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
