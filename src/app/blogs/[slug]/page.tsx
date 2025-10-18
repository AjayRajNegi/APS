import { JSX } from "react";
import Image from "next/image";
import { BlogsShowcase } from "@/app/components/BlogsShowcase";

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

interface ListBlock {
  type: "list";
  data: {
    style: "ol" | "ul";
    items: string[];
  };
}

interface QuoteBlock {
  type: "quote";
  data: {
    text: string;
    author?: string;
  };
}

interface CalloutBlock {
  type: "callout";
  data: {
    variant: "success" | "info" | "warning" | "error";
    html: string;
  };
}

interface ProblemSolutionBlock {
  type: "problem_solution";
  data: {
    number: number;
    title: string;
    problem: string;
    solution: string;
  };
}

type BlogContentBlock =
  | HeroBlock
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | CalloutBlock
  | ProblemSolutionBlock;

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

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blogs/${slug}`,
      { cache: "force-cache" },
    );
    if (!res.ok) throw new Error("Failed to fetch blog");
    const data: Blog = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blogs`,
      { cache: "force-cache" },
    );
    if (!res.ok) throw new Error("Failed to fetch blog list");

    const blogs: Blog[] = await res.json();

    return blogs.map((b) => ({
      slug: b.slug,
    }));
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

export default async function IndividualBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <article className="my-[50px] flex max-w-[1500px] flex-col items-center bg-[#f7f9fa]">
        {/* Title */}
        <h1 className="w-[90%] text-center text-4xl font-semibold tracking-tight text-shadow-2xs md:w-[65%] md:text-5xl">
          {blog.title}
        </h1>

        {/* Excerpt */}
        <h4 className="my-[30px] w-[95%] text-center text-sm text-black/60 md:w-[80%] md:text-base">
          {blog.excerpt}
        </h4>

        {/* Content blocks */}
        <div className="w-full">
          {blog.content.map((block, i) => {
            switch (block.type) {
              case "hero":
                return (
                  <div
                    key={i}
                    className="relative my-[40px] h-[min(calc(100vh/2),500px)] w-full overflow-hidden rounded-4xl [mask-image:linear-gradient(to_top,rgb(0,0,0,0.5),black_90%,black)]"
                  >
                    {block.data.image && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URI}/storage/${block.data.image}`}
                        fill
                        alt={block.data.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-[4%] left-[4%] text-white">
                      <h2 className="text-2xl font-bold text-shadow-2xs">
                        {block.data.title}
                      </h2>
                    </div>
                  </div>
                );

              case "heading":
                const HeadingTag =
                  `h${block.data.level}` as keyof JSX.IntrinsicElements;
                return (
                  <HeadingTag
                    key={i}
                    className="my-6 w-full text-left text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    {block.data.text}
                  </HeadingTag>
                );

              case "paragraph":
                return (
                  <p
                    key={i}
                    className="my-4 w-full text-justify leading-relaxed text-black/80 md:text-lg"
                    dangerouslySetInnerHTML={{ __html: block.data.html }}
                  />
                );

              case "list":
                return block.data.style === "ol" ? (
                  <ol
                    key={i}
                    className="my-6 list-decimal pl-6 text-black/80 md:text-lg"
                  >
                    {block.data.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul
                    key={i}
                    className="my-6 list-disc pl-6 text-black/80 md:text-lg"
                  >
                    {block.data.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                );

              case "quote":
                return (
                  <blockquote
                    key={i}
                    className="my-6 border-l-4 border-gray-400 pl-4 text-black/70 italic md:text-lg"
                  >
                    “{block.data.text}”
                    {block.data.author && (
                      <footer className="mt-2 text-sm text-black/50">
                        — {block.data.author}
                      </footer>
                    )}
                  </blockquote>
                );

              case "callout":
                return (
                  <div
                    key={i}
                    className={`my-6 rounded-md p-4 ${
                      block.data.variant === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: block.data.html }}
                  />
                );

              case "problem_solution":
                return (
                  <div
                    key={i}
                    className="my-6 rounded-md border border-gray-200 bg-gray-50 p-6"
                  >
                    <h3 className="mb-2 text-xl font-bold">
                      {block.data.number}. {block.data.title}
                    </h3>
                    <p className="mb-2">
                      <strong>Problem:</strong> {block.data.problem}
                    </p>
                    <p>
                      <strong>Solution:</strong> {block.data.solution}
                    </p>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </article>

      <BlogsShowcase href="" />
    </>
  );
}
