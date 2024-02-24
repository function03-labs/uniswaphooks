import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import ToolGrid from "@component/showcase/tool/ToolGrid";

export const metadata = {
  title: "Tools",
};

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
        tag: toolData?.tag,
        emoji: toolData.emoji,
        category: toolData.category,
      };
    })
  );

  return toolPosts;
}

export default async function Page() {
  const toolPosts = await getTools();

  return (
    <>
      <HeroBanner
        title="Tools"
        subtitle="Tools to help you understand Uniswap v4"
      />

      <Container classNames="pb-8 lg:pb-12">
        <ToolGrid tools={toolPosts} />
      </Container>
    </>
  );
}
