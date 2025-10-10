import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Container from "./components/Container";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "./components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APS",
  description: "Airport Porter Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "relative overflow-x-hidden",
          "font-poppins bg-[#f7f9fa]",
        )}
      >
        <LenisProvider>
          <Navbar />
          <Container>{children}</Container>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
