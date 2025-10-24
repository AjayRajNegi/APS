"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroBlock {
  type: "hero";
  data: {
    title: string;
    image: string;
    image_url: string | null;
  };
}

interface HeadingBlock {
  type: "heading";
  data: {
    text: string;
    level: number;
  };
}

interface ParagraphBlock {
  type: "paragraph";
  data: {
    html: string;
  };
}

type BlogContentBlock = HeroBlock | HeadingBlock | ParagraphBlock;

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContentBlock[];
  status: string;
  published_at: string;
  cover_image_path: string | null;
  created_at: string;
  updated_at: string;
  category: string;
}

export function BlogsShowcase({ href }: { href: string }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Blog");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blogs/category/${selectedCategory}`,
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <section className="md:mx-8">
      {/* Category Selection */}
      <article>
        <h2 className="text-3xl font-semibold md:text-4xl">
          {selectedCategory}
        </h2>
        <p className="my-2.5 w-[90%] text-black/60 md:w-1/2">
          Discover expert travel tips, airport insights, and luggage-handling
          guides from APS - Canada&apos;s trusted airport porter service. Our
          blogs help you travel smarter, stress-free, and with confidence. Learn
          how professional porters make every journey smoother, from check-in to
          arrival.
        </p>
        <div className="flex justify-between gap-0 md:justify-start md:gap-5">
          {categories.map((category) => (
            <p
              key={category}
              className={cn(
                "w-fit cursor-pointer rounded-lg px-3 py-2 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow transition-transform duration-300 hover:scale-95 hover:shadow-none md:text-base",
                selectedCategory === category
                  ? "bg-aps-secondary-300 text-white"
                  : "bg-gray-100",
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </p>
          ))}
        </div>
      </article>

      {/* Blogs */}
      <article className="scrollbar-hide mx-auto my-[30px] w-full max-w-[1400px] overflow-x-auto">
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found for {selectedCategory}</p>
        ) : (
          <div className="scrollbar-hide flex gap-6 px-4 py-4">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`${href}${blog.slug}`}
                className="h-[450px] w-[90%] flex-shrink-0 overflow-hidden rounded-2xl border border-neutral-300 shadow-md transition-transform duration-300 hover:scale-95 md:w-[45%] lg:w-[42%] xl:w-[32%]"
              >
                <div className="relative h-1/2 w-full overflow-hidden">
                  <Image
                    src="/mainImage.png"
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 py-4">
                  <p>
                    <span className="text-aps-secondary-400 border-r-2 border-gray-300 pr-1.5 text-sm">
                      {blog.category}
                    </span>
                    <span className="pl-1.5 text-sm text-black/80">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </p>

                  <h4 className="my-2 text-lg leading-6 font-semibold">
                    {blog.title}
                  </h4>
                  <p className="line-clamp-3 text-black/60">{blog.excerpt}</p>
                  <p className="text-aps-secondary-400 mt-3 mb-1 flex items-center gap-1 text-lg font-semibold">
                    Learn More <ArrowRight size={20} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
