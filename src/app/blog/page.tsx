import { NotepadText } from "lucide-react";
import { BlogsShowcase } from "../components/BlogsShowcase";

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <article className="my-[50px] flex w-full flex-col items-center">
        <p className="flex w-fit items-center gap-0.5 rounded-lg border-[1px] border-gray-300 bg-gray-100 px-2 py-1 text-sm">
          <NotepadText size={15} /> Blog
        </p>
        <h1 className="my-[30px] text-center text-6xl font-semibold tracking-tight">
          Insight and Updates
        </h1>
        <p className="text-center text-black/60">
          A collection of hand-picked articles. Deep dives, insights, and <br />
          honest advice to navigate our ecosystem.
        </p>
      </article>
      <BlogsShowcase href="blog/" />
    </>
  );
}
