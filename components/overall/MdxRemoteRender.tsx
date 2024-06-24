"use client"

import { MDXRemote } from "next-mdx-remote"

export function MdxContent({
  mdxSource,
  mdxComponents = {},
  mdxScope = {},
}: {
  mdxSource: any
  mdxComponents: any
  mdxScope: any
}) {
  return (
    <MDXRemote {...mdxSource} components={mdxComponents} scope={mdxScope} />
  )
}
