import { MoveRight } from "lucide-react";
import { TextEffect } from "../components/TextEffect";

export default function Contact() {
  return (
    <section className="mx-auto my-8 flex max-w-7xl flex-col-reverse gap-12 bg-[#f7f9fa] px-6 md:flex-row md:gap-16 lg:px-12">
      {/* Left */}
      <article className="flex w-full flex-col items-start md:w-1/2">
        <h1 className="text-5xl font-bold tracking-tighter lg:text-7xl">
          Let&apos;s get <br /> in touch
        </h1>

        <p className="my-8 text-lg font-semibold tracking-tight sm:my-12 sm:text-xl lg:text-2xl">
          Don&apos;t be afraid to <br /> say hello with us!
        </p>

        <div className="space-y-6 text-base sm:text-lg">
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="font-semibold">+91 9824688721</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-semibold">hello@aps.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Office</p>
            <p className="font-semibold">Elite Estates</p>
            <p className="flex items-center gap-1 font-semibold underline">
              See on Google Map <MoveRight className="-rotate-45" size={18} />
            </p>
          </div>
        </div>
      </article>

      {/* Right */}
      <article className="flex w-full flex-col md:w-1/2">
        <div className="mb-8 text-sm text-gray-600 md:ml-auto md:w-3/4 lg:w-2/3">
          <TextEffect>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            autem corporis quo illo aperiam consequuntur eveniet ipsam.
          </TextEffect>
        </div>

        <div className="rounded-3xl bg-[#141414] p-6 text-white shadow-lg sm:p-8">
          <h2 className="mb-6 text-xl font-semibold sm:text-2xl">Contact</h2>

          {/* Form */}
          <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-[#a3a3a3]">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-[#a3a3a3]">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-[#a3a3a3]">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label htmlFor="subject" className="text-sm text-[#a3a3a3]">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col sm:col-span-2">
              <label htmlFor="message" className="text-sm text-[#a3a3a3]">
                Tell us about your interest
              </label>
              <textarea
                id="message"
                rows={4}
                className="resize-none border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-yellow-300 py-4 font-medium text-black transition hover:bg-yellow-400"
              >
                Send to us
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
}
