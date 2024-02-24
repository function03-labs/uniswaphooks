import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

import BlogGrid from "@/components/showcase/blog/BlogGrid";
import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";

export const metadata = {
  title: "Blogs",
};

const postsPath = join(process.cwd(), "/data/blogs");

async function getPosts() {
  const blogSlugs = await fs.readdir(postsPath);

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath = join(postsPath, blogSlug);
      const blogItem = await fs.readFile(postPath, "utf-8");

      const { data: blogData } = matter(blogItem);

      return {
        title: blogData.title,
        date: blogData.date,
        emoji: blogData.emoji,
        tag: blogData.tag,
        slug: blogSlug.replace(".mdx", ""),
      };
    })
  );

  return blogPosts.sort((blogA, blogB) => {
    const dateA = new Date(blogA.date);
    const dateB = new Date(blogB.date);

    return dateB.getTime() - dateA.getTime();
  });
}

export default async function Page() {
  const blogPosts = await getPosts();

  return (
    <main>
      <HeroBanner
        title="Blogs"
        subtitle="Read the latest blogs from the community and our team."
      />

      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </main>
  );
}
