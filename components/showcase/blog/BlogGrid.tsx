import { BlogPost } from "@/types/post";
import BlogCard from "@/components/showcase/blog/BlogCard";

export default function BlogGrid({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((blogPost) => (
        <li key={blogPost.slug}>
          <BlogCard blogPost={blogPost} />
        </li>
      ))}
    </ul>
  );
}
