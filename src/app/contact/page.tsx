import { MoveRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="my-[50px] flex px-[150px]">
      {/* Left */}
      <article className="flex w-1/2 flex-col items-start">
        <h1 className="text-sha text-8xl font-bold tracking-tighter">
          Let&apos;s get <br /> in touch
        </h1>
        <p className="my-[50px] text-2xl font-semibold tracking-tighter">
          Don&apos;t be afraid to <br /> say hello with us!
        </p>
        <p className="text-sm text-gray-400">Phone</p>
        <p className="font-semibold">+91 9824688721</p>
        <p className="mt-[30px] text-sm text-gray-400">Email</p>
        <p className="font-semibold">hello@aps.com</p>
        <p className="mt-[30px] text-sm text-gray-400">Office</p>
        <p className="font-semibold">Elite Estates</p>
        <p className="flex items-center gap-1 font-semibold underline">
          See on Google Map <MoveRight className="-rotate-45" size={20} />
        </p>
      </article>
      {/* Right */}
      <article className="flex w-1/2 flex-col justify-between text-white">
        <div className="ml-auto w-1/2 text-justify text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          autem corporis quo illo aperiam consequuntur eveniet ipsam, .
        </div>
        <div className="mx-auto h-fit max-w-5xl rounded-4xl bg-[#141414] p-8 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
          <h2 className="mb-8 text-2xl font-semibold">Contact</h2>

          {/* Form */}
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-[#a3a3a3]">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="p border-b border-gray-500 bg-transparent focus:border-white focus:outline-none"
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
                className="border-b border-gray-500 bg-transparent focus:border-white focus:outline-none"
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
                className="border-b border-gray-500 bg-transparent focus:border-white focus:outline-none"
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
                className="border-b border-gray-500 bg-transparent focus:border-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="text-sm text-[#a3a3a3]">
                Tell us about your interested in
              </label>
              <textarea
                id="message"
                rows={3}
                className="resize-none border-b border-gray-500 bg-transparent py-2 focus:border-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
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
