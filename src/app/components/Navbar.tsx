import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Blogs", href: "/blog" },
];

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 z-10 mx-auto mt-4 flex h-[70px] w-[95%] max-w-[1540px] -translate-x-1/2 items-center justify-between rounded-full bg-[#C1121F] px-4 shadow-2xl">
      <Link
        href="/"
        className="rounded-full bg-white px-2 py-1 shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        <Image
          src="/apsLogo.png"
          height={100}
          width={140}
          alt="logo"
          className=""
        />
      </Link>
      <div className="flex gap-4 text-lg text-white text-shadow-xs">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.title}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="rounded-full bg-white p-2 px-3 text-lg text-black shadow-2xl transition-transform duration-300 text-shadow-xs hover:scale-105">
        <Link href="/managebookings">Manage Bookings</Link>
      </div>
    </nav>
  );
}
