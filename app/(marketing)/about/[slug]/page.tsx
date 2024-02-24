import { join } from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";
import remarkSlug from "remark-slug";
import { serialize } from "next-mdx-remote/serialize";
import rehypeExternalLinks from "rehype-external-links";

import FaqList from "@component/section/FaqList";
import Container from "@component/overall/Container";
import SponsorGrid from "@component/section/SponsorGrid";
import MdxRemoteRender from "@component/overall/MdxRemoteRender";

const mdxComponents = {
  FaqList,
  SponsorGrid,
};

const pagesPath = join(process.cwd(), "/data/pages");

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { pageData } = await getPage(params);

  return {
    title: `${pageData.title} | UniswapHooks`,
  };
}

export async function generateStaticParams() {
  return await fs.readdir(pagesPath);
}

async function getPage(params: { slug: string }) {
  const pagePath = join(pagesPath, `${params.slug}.mdx`);
  const pageItem = await fs.readFile(pagePath, "utf-8");

  const { content, data: frontmatter } = matter(pageItem);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
    },
    scope: frontmatter,
  });

  return {
    pageData: frontmatter,
    pageContent: mdxSource,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { pageData, pageContent } = await getPage(params);

  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <MdxRemoteRender
          mdxSource={pageContent}
          mdxComponents={mdxComponents}
          mdxScope={undefined}
        />
      </article>
    </Container>
  );
}
