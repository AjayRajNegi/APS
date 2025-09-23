"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const navLinks = [
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Blogs", href: "/blog" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="gradient-background fixed left-1/2 z-30 mx-auto mt-1 flex h-[70px] w-[98%] max-w-[1540px] -translate-x-1/2 items-center justify-between rounded-full border-[0.5px] border-neutral-300 px-4 shadow-2xl md:mt-1.5 md:w-[95%]">
      <Link
        href="/"
        className="rounded-full bg-white px-2 py-1 shadow-2xl transition-transform duration-300 hover:scale-110"
      >
        <Image src="/apsLogo.png" height={60} width={120} alt="logo" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden gap-6 text-lg text-white md:flex">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="underlineAnimationLinks"
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Desktop Button */}
      <div className="text-md hidden rounded-full bg-white font-medium text-black shadow-2xl transition-transform duration-300 hover:scale-110 md:flex">
        <Link
          href="/managebookings"
          className="group bg-aps-secondary-300 relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-4 py-2.5 font-medium text-black shadow-md transition duration-300 ease-out"
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
          <span className="invisible relative">Manage Bookings</span>
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="rounded-full bg-white p-2 shadow-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav with AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="from-aps-400 to-aps-200 absolute top-[75px] left-0 z-10 mb-10 h-[90vh] w-full rounded-2xl bg-gradient-to-b p-6 shadow-lg md:hidden"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul
              className="flex flex-col gap-4 text-lg text-white"
              variants={containerVariants}
            >
              {navLinks.map((link) => (
                <motion.li key={link.title} variants={linkVariants}>
                  <Link href={link.href} className="block">
                    {link.title}
                  </Link>
                </motion.li>
              ))}

              <motion.li variants={linkVariants}>
                <Link
                  href="/managebookings"
                  className="block rounded-lg bg-white px-4 py-2 text-center text-black"
                >
                  Manage Bookings
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
