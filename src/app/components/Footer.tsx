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
    <footer className="mx-auto w-[95%] rounded-4xl bg-black/85 p-8 text-white">
      <div>
        <h1 className="text-6xl font-semibold">
          Popular with travelers all over the WORLD
        </h1>
        <p className="mt-4 mb-[50px] text-lg text-gray-400">
          Join us for a relaxing journey.
        </p>
      </div>
      <div className="border-[1px] border-gray-400" />
      <div className="mt-[50px] flex items-center justify-between">
        {/* Left */}
        <div>
          <div className="">
            <Link
              href="/"
              className="flex w-fit items-center space-x-2 rounded-full bg-white px-4 py-2 text-black"
            >
              <Image src="/apsLogo.png" height={100} width={140} alt="logo" />
            </Link>
            <p className="mt-4 text-gray-400">
              This guide explains how APS <br /> meets your daily flight needs.
            </p>
            <p className="mt-2 cursor-pointer text-white hover:underline">
              More About us
            </p>
          </div>
          <p>2025 AirportPorterService copyright All Reserved</p>
        </div>
        {/* Right */}
        <div>
          <div>
            {navLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
