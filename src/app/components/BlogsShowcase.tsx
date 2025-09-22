"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Category = ["Blogs", "Articles", "UGC", "Case Studies"];
const blogs = [
  {
    id: 1,
    title: "Hello to the freate and asd",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
    category: "IT",
    slug: "1",
  },
  {
    id: 2,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
    category: "Product Placement",
    slug: "2",
  },
  {
    id: 3,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
    category: "Tecb",
    slug: "3",
  },
  {
    id: 4,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
    category: "Sales",
    slug: "4",
  },
  {
    id: 5,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil architecto laborum sequi. Fugiat ad soluta asperiores reprehenderit. Incidunt quis illum, repudiandae possimus natus deserunt dolorem voluptate officia at id.",
    imageUrl: "/mainImage.png",
    category: "IT",
    slug: "5",
  },
];

export function BlogsShowcase({ href }: { href: string }) {
  const [cat, setCat] = useState<string>("Articles");
  return (
    <section className="md:mx-8">
      {/* Category */}
      <article>
        <h2 className="text-3xl font-semibold md:text-4xl">{cat}</h2>
        <p className="my-2.5 w-[90%] text-black/60 md:w-1/2">
          Find or list tools that will help designers build to last. Simplify
          design with our comprehensive and carefully vetted library from the
          start.
        </p>
        <div className="flex justify-between gap-0 md:justify-start md:gap-5">
          {Category.map((category) => (
            <p
              key={category}
              className={cn(
                "w-fit cursor-pointer rounded-lg px-3 py-2 text-sm md:text-base",
                `${cat === category ? "bg-aps-secondary-300 text-white" : "bg-gray-100"}`,
              )}
              onClick={() => setCat(category)}
            >
              {category}
            </p>
          ))}
        </div>
      </article>
      <article className="scrollbar-hide mx-auto my-[30px] w-full max-w-[1400px] overflow-x-auto">
        <div className="scrollbar-hide flex gap-6 px-4 py-4">
          {blogs.map((blog, idx) => (
            <div
              className="h-[450px] w-[90%] flex-shrink-0 rounded-2xl p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-[45%] lg:w-[42%] xl:w-[32%]"
              key={idx}
            >
              <div className="relative h-1/2 w-full overflow-hidden rounded-2xl">
                <Image src={blog.imageUrl} objectFit="cover" alt="asda" fill />
              </div>
              <div className="py-4">
                <p>
                  <span className="text-aps-secondary-400 border-r-2 border-gray-300 pr-1.5 text-sm">
                    {blog.category}
                  </span>
                  <span className="pl-1.5 text-sm text-black/80">
                    Sep 20, 2025
                  </span>
                </p>

                <h4 className="my-2 text-lg leading-6 font-semibold">
                  {blog.title}
                </h4>
                <p className="line-clamp-3 text-black/60">{blog.description}</p>
                <Link
                  href={`${href}${blog.slug}`}
                  className="text-aps-secondary-400 mt-3 mb-1 flex items-center gap-1 text-lg font-semibold text-shadow-2xs"
                >
                  Learn More <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* <article className="mx-auto my-[30px] flex w-full max-w-[1400px] flex-wrap justify-between gap-6">
        {blogs.map((blog, idx) => (
          <div
            className="mx-auto h-[450px] w-[90%] rounded-2xl p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-[45%] lg:w-[42%] xl:w-[32%]"
            key={idx}
          >
            <div className="relative h-1/2 w-full overflow-hidden rounded-2xl">
              <Image src={blog.imageUrl} objectFit="cover" alt="asda" fill />
            </div>
            <div className="py-4">
              <p>
                <span className="text-aps-secondary-400 border-r-2 border-gray-300 pr-1.5 text-sm">
                  {blog.category}
                </span>
                <span className="pl-1.5 text-sm text-black/80">
                  Sep 20, 2025
                </span>
              </p>

              <h4 className="my-2 text-lg leading-6 font-semibold">
                {blog.title}
              </h4>
              <p className="line-clamp-3 text-black/60">{blog.description}</p>
              <Link
                href={`${href}${blog.slug}`}
                className="text-aps-secondary-400 mt-3 mb-1 flex items-center gap-1 text-lg font-semibold text-shadow-2xs"
              >
                Learn More <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ))}
      </article> */}
    </section>
  );
}
