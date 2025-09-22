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
    <footer className="mx-auto mb-8 w-[95%] max-w-[1540px] rounded-3xl bg-[#141414] p-8 text-white">
      {/* Top Heading */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl leading-snug font-semibold md:text-5xl">
          Popular with travelers all over the WORLD
        </h1>
        <p className="mt-4 mb-8 text-base text-[#a3a3a3] md:text-lg">
          Join us for a relaxing journey.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#a3a3a3]/40" />

      {/* Main Footer Grid */}
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        {/* Left Section */}
        <div className="flex flex-col justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 rounded-full bg-white px-4 py-2"
            >
              <Image src="/apsLogo.png" height={50} width={80} alt="logo" />
            </Link>
            <p className="mt-4 text-sm text-[#a3a3a3] md:text-base">
              This guide explains how APS <br /> meets your daily flight needs.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block text-white hover:underline"
            >
              More About us
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#a3a3a3]">
            © 2025 AirportPorterService. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Navigation */}
          <div>
            <p className="mb-4 font-semibold text-white">Navigation</p>
            <ul className="flex justify-between space-y-2 text-sm text-[#a3a3a3] md:block">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact & Company Info */}
          <div>
            <p className="mb-4 font-semibold text-white">Contact Us</p>
            <p className="text-sm text-[#a3a3a3]">+91 93472944830</p>
            <p className="text-sm break-words text-[#a3a3a3]">
              airportporterservice123@gmail.com
            </p>

            <p className="mt-6 mb-2 font-semibold text-white">
              Company & Legals
            </p>
            <ul className="space-y-1 text-sm text-[#a3a3a3]">
              <li>About Us</li>
              <li>Terms of Service</li>
              <li>License</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Location (Full Width on Mobile) */}
      <div className="mt-8">
        <p className="mb-2 font-semibold">Location</p>
        <p className="text-sm text-[#a3a3a3]">
          Elite Estate, Sudhowala, Dehradun
        </p>
      </div>
    </footer>
  );
}
