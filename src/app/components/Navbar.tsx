"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Blogs", href: "/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed left-1/2 z-20 mx-auto mt-4 flex h-[70px] w-[95%] max-w-[1540px] -translate-x-1/2 items-center justify-between rounded-full bg-[#C1121F] px-4 shadow-2xl">
      {/* Logo */}
      <Link
        href="/"
        className="rounded-full bg-white px-2 py-1 shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        <Image src="/apsLogo.png" height={60} width={100} alt="logo" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden gap-6 text-lg text-white md:flex">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="underline-offset-4 hover:underline"
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Desktop Button */}
      <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-2xl transition-transform duration-300 hover:scale-105 md:flex">
        <Link href="/managebookings">Manage Bookings</Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="rounded-full bg-white p-2 shadow-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 z-10 w-full rounded-2xl bg-[#C1121F] p-6 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4 text-lg text-white">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className="block">
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/managebookings"
                className="block rounded-lg bg-white px-4 py-2 text-center text-black"
              >
                Manage Bookings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
