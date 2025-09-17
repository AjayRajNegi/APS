"use client";
import { useState } from "react";
import { cn } from "../lib/cn";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

const Country = ["Canada", "India", "UAE", "USA"];
const blogs = [
  {
    id: 1,
    title: "Indira Gandhi International Airport",
    location: "Delhi",
    imageUrl: "/mainImage.png",
  },
  {
    id: 2,
    title: "Chhatrapati Shivaji Maharaj Airport",
    location: "Mumbai",
    imageUrl: "/mainImage.png",
  },
  {
    id: 3,
    title: "Rajiv Gandhi International Airport",
    location: "Hyderabad",
    imageUrl: "/mainImage.png",
  },
  {
    id: 4,
    title: "Cochin International Airport",
    location: "Cochin",
    imageUrl: "/mainImage.png",
  },
  {
    id: 5,
    title: "Chennai International Airport",
    location: "Chennai",
    imageUrl: "/mainImage.png",
  },
];

export function AirportSection() {
  const [cat, setCat] = useState("Canada");
  return (
    <div>
      {/* Country Section */}
      <div className="flex justify-center gap-5">
        {Country.map((Country) => (
          <p
            key={Country}
            className={cn(
              "w-fit cursor-pointer rounded-full px-3 py-2 text-base",
              `${cat === Country ? "bg-aps-secondary-300 text-white" : "bg-gray-100"}`,
            )}
            onClick={() => setCat(Country)}
          >
            {Country}
          </p>
        ))}
      </div>
      {/* Blogs Section */}
      <div className="scrollbar-hide mt-[50px] flex gap-[20px] overflow-x-auto">
        {blogs.map((blog, idx) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={idx}
            className="flex h-[450px] w-[350px] cursor-pointer items-end justify-end rounded-2xl"
            style={{
              backgroundImage: `url('${blog.imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="m-4 flex w-[90%] items-center justify-between rounded-2xl bg-white px-3 py-1">
              <div className="w-[80%]">
                <h3 className="w-[80%] truncate text-lg font-semibold">
                  {blog.title}
                </h3>
                <p className="truncate text-gray-600">{blog.location}</p>
              </div>
              <ArrowDownRight
                className="bg-aps-secondary-300 -z-0 -rotate-90 rounded-full p-1 text-white"
                size={40}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
