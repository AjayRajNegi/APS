import { BlogsShowcase } from "@/app/components/BlogsShowcase";

export default async function IndividualBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      {slug}
      <BlogsShowcase />
    </>
  );
}
