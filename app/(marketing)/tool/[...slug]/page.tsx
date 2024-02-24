import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

import Container from "@component/overall/Container";
import CollectionLinks from "@component/ui/CollectionLinks";
import ToolForm from "@component/showcase/tool/ToolForm";

export async function generateMetadata(params: { slug: string }) {
  try {
    const data = await getToolData(params);

    if (!data) {
      return {
        status: 404,
      };
    }

    return {
      title: `${data.title} | UniswapHooks`,
    };
  } catch (error) {
    console.error("Error fetching collection data:", error);
  }
}

async function getToolData(params: { slug: string }, _preview?: boolean) {
  const toolPosts = await getTools();
  return toolPosts.find((toolPost) => toolPost.id === params.slug[0]);
}

async function getTools() {
  const toolsPath = join(process.cwd(), "/data/tools");
  const toolSlugs = await fs.readdir(toolsPath);

  const toolPosts = await Promise.all(
    toolSlugs.map(async (toolSlug) => {
      const postPath = join(toolsPath, toolSlug);
      const toolItem = await fs.readFile(postPath, "utf-8");

      const { data: toolData } = matter(toolItem);

      return {
        id: toolData.id,
        title: toolData.title,
        description: toolData.description,
        docs: toolData.docs,
        tag: toolData?.tag,
        emoji: toolData.emoji,
        category: toolData.category,
      };
    })
  );

  return toolPosts;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getToolData(params);

  if (!data) {
    return {
      status: 404,
    };
  }

  const tools = await getTools();

  const activeCategory = {
    category: data.category,
    emoji: "🔧",
  };

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.slug}
        activeCategory={activeCategory}
        componentsData={tools}
      />

      <div>
        <ToolForm toolPost={data} params={params} />
      </div>
    </Container>
  );
}
