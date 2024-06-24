import { promises as fs } from "fs"
import { join } from "path"

import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeExternalLinks from "rehype-external-links"
import remarkSlug from "remark-slug"

import { Container } from "@/components/overall/Container"
import { MdxContent } from "@/components/overall/MdxRemoteRender"
import { BlogPreview } from "@/components/showcase/blog/BlogPreview"
import { BlogTableContent } from "@/components/showcase/blog/BlogTableContent"

const mdxComponents = {
  BlogPreview,
}

const postsPath = join(process.cwd(), "/data/blogs")

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const { blogData } = await getPost(params)

  return {
    title: `${blogData.title}`,
    description: blogData.description,
    openGraph: {
      title: `${blogData.title} | UniswapHooks`,
      description: blogData.description,
    },
    twitter: {
      title: `${blogData.title} | UniswapHooks`,
      description: blogData.description,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

async function getPost(params: { slug: string }) {
  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, "utf-8")

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
    },
    scope: frontmatter,
  })

  return {
    blogData: frontmatter,
    blogContent: mdxSource,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { blogData, blogContent } = await getPost(params)

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    headline: `${blogData.title}`,
    image: "https://www.uniswaphooks.com/og.png",
    datePublished: `${blogData.date}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container classNames="py-8 lg:py-12">
        <article className="prose mx-auto prose-img:rounded-lg">
          <header>
            <time className="text-sm text-gray-700">{blogData.date}</time>
            <h1 className="mt-1">{blogData.title}</h1>
          </header>

          <BlogTableContent />

          <MdxContent
            mdxScope={blogData}
            mdxSource={blogContent}
            mdxComponents={mdxComponents}
          />
        </article>
      </Container>
    </>
  )
}
