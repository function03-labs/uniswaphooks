import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

import Container from "@component/overall/Container";
import ChainGrid from "@/components/showcase/chain/ChainGrid";
import HeroBanner from "@component/section/HeroBanner";

export const metadata = {
  title: "Chains",
};

const chainsPath = join(process.cwd(), "/data/chains");

async function getChains() {
  const chainSlugs = await fs.readdir(chainsPath);

  const chainPosts = await Promise.all(
    chainSlugs.map(async (chainSlug) => {
      const postPath = join(chainsPath, chainSlug);
      const chainItem = await fs.readFile(postPath, "utf-8");

      const { data: chainData } = matter(chainItem);

      return {
        title: chainData.title,
        logo: chainData.logo,
        chainID: chainData.ChainID,
        currency: chainData.currency,
        poolManager: chainData.poolManagerAddress,
        slug: chainSlug.replace(".mdx", ""),
        tags: chainData.tags,
        docs: chainData.docs,
      };
    })
  );

  return chainPosts.sort((a, b) =>
    a.chainID === 111 ? -1 : b.chainID === 111 ? 1 : 0
  );
}

export default async function Page() {
  const chainPosts = await getChains();

  return (
    <>
      <HeroBanner
        title="Chains"
        subtitle="List of EVM networks where Uniswap v4 is deployed."
      />

      <Container classNames="pb-8 lg:pb-12">
        <ChainGrid chainPosts={chainPosts} />
      </Container>
    </>
  );
}
