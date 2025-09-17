"use client";
import { useState } from "react";
import { cn } from "../lib/cn";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

const Category = ["Blogs", "Articles", "UGC", "Case Studies"];
const blogs = [
  {
    id: 1,
    title: "Hello to the freate and asd",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
  },
  {
    id: 2,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
  },
  {
    id: 3,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
  },
  {
    id: 4,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
  },
  {
    id: 5,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
  },
];

export function BlogsSection() {
  const [cat, setCat] = useState("Blogs");
  return (
    <div>
      {/* Category Section */}
      <div className="flex justify-center gap-5">
        {Category.map((category) => (
          <p
            key={category}
            className={cn(
              "w-fit cursor-pointer rounded-full px-3 py-2 text-base",
              `${cat === category ? "bg-aps-secondary-300 text-white" : "bg-gray-100"}`,
            )}
            onClick={() => setCat(category)}
          >
            {category}
          </p>
        ))}
      </div>
      {/* Blogs Section */}
      <div className="scrollbar-hide mt-[50px] flex gap-[20px] overflow-x-auto">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.id}
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
                <p className="truncate text-gray-600">{blog.description}</p>
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
