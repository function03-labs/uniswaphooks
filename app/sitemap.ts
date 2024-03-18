import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

async function getCategories() {
  const fetchCategories = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category`
  );
  const categories = await fetchCategories.json();
  return categories.data;
}

async function getResources() {
  const fetchResources = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resource`
  );
  const resources = await fetchResources.json();
  return resources.data;
}

async function getHooks() {
  const fetchHooks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hook`);
  const hooks = await fetchHooks.json();
  return hooks.data;
}

async function getBlogs() {
  const postsPath = join(process.cwd(), "/data/blogs");
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
        slug: blogSlug.replace(".mdx", ""),
      };
    })
  );

  return blogPosts.sort((blogA, blogB) => {
    const dateA = new Date(blogA.date);
    const dateB = new Date(blogB.date);

    return dateB instanceof Date && dateA instanceof Date
      ? dateB.getTime() - dateA.getTime()
      : 0;
  });
}

async function getTools() {
  const toolsPath = join(process.cwd(), "/data/tools");
  const toolSlugs = await fs.readdir(toolsPath);

  return Promise.allSettled(
    toolSlugs.map(async (toolSlug) => {
      const postPath = join(toolsPath, toolSlug);
      const toolItem = await fs.readFile(postPath, "utf-8");
      const { data: toolData } = matter(toolItem);

      return {
        id: toolData.id,
      };
    })
  );
}

export default async function sitemap() {
  try {
    const categories = await getCategories();
    const siteSlugsCategories = categories.map(
      (category: any) => `hooks/collection/${category.id}`
    );

    const hooks = await getHooks();
    const siteSlugsHooks = hooks.map((hook: any) => `hooks/hook/${hook.id}`);

    const resources = await getResources();
    const siteSlugsResourcesPosts = resources.map(
      (resource: any) => `community/${resource.id}`
    );

    const blogs = await getBlogs();
    const siteSlugsPosts = blogs.map((blog: any) => `blog/${blog.slug}`);

    const tools = await getTools();
    const siteSlugsTools = tools.map((tool: any) => `tools/${tool.value.id}`);

    const siteSlugs = [
      ...siteSlugsCategories,
      ...siteSlugsHooks,
      ...siteSlugsTools,
      ...siteSlugsPosts,
      ...siteSlugsResourcesPosts,
    ];
    const currentDate = new Date();

    const transformedSlugs = siteSlugs.map((siteSlug) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/${siteSlug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [
      {
        url: process.env.NEXT_PUBLIC_URL!,
        lastModified: "currentDate",
        changeFrequency: "weekly",
        priority: 1,
      },
      ...transformedSlugs,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}
