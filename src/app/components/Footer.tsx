import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About us", href: "/" },
  { title: "Contact", href: "/" },
  { title: "Services", href: "/" },
  { title: "Blogs", href: "/" },
];
export function Footer() {
  return (
    <footer className="mx-auto mb-[30px] w-[95%] rounded-4xl bg-[#141414] p-8 text-white">
      <div>
        <h1 className="text-6xl font-semibold">
          Popular with travelers all over the WORLD
        </h1>
        <p className="mt-4 mb-[50px] text-lg text-[#a3a3a3]">
          Join us for a relaxing journey.
        </p>
      </div>
      <div className="border-[1px] border-[#a3a3a3]" />
      <div className="mt-[50px] flex justify-between">
        {/* Left */}
        <div className="flex max-h-[300px] w-[50%] flex-col justify-between">
          <div>
            <Link
              href="/"
              className="flex w-fit items-center space-x-2 rounded-full bg-white px-4 py-2 text-black"
            >
              <Image src="/apsLogo.png" height={100} width={140} alt="logo" />
            </Link>
            <p className="mt-4 text-[#a3a3a3]">
              This guide explains how APS <br /> meets your daily flight needs.
            </p>
            <p className="mt-2 cursor-pointer text-white hover:underline">
              More About us
            </p>
          </div>
          <p>2025 AirportPorterService copyright All Reserved</p>
        </div>
        {/* Right */}
        <div className="max-h-[300px] w-[50%]">
          <div className="mr-16 mb-[100px] flex justify-between text-lg text-[#a3a3a3]">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="mb-4">Contact Us</p>
              <p className="text-sm text-[#a3a3a3]">+91 93472944830</p>
              <p className="text-sm text-[#a3a3a3]">
                airportporterservice123@gmail.com
              </p>
            </div>
            <div>
              <p className="mb-4">Company % Legals</p>
              <p className="text-sm text-[#a3a3a3]">About Us</p>
              <p className="text-sm text-[#a3a3a3]">Term of Services</p>
              <p className="text-sm text-[#a3a3a3]">License</p>
            </div>
          </div>
          <div>
            <p className="mb-4">Location</p>
            <p className="text-sm text-[#a3a3a3]">
              Elite Estate, Sudhowala, Dehradun
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
