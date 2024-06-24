import Link from "next/link"
import { sections } from "@config/community"
import { ResourcePost } from "@/types/post"

import { CollectionLinks } from "@/components/ui/CollectionLinks"
import { Container } from "@/components/overall/Container"
import { HeroBanner } from "@/components/section/HeroBanner"
import { ResourceGrid } from "@/components/showcase/resource/ResourceGrid"

async function getResources() {
  try {
    const responseResources = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/resource?${Date.now()}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    ).then((res) => res.json())

    return responseResources.data.filter(
      (resource: ResourcePost) => resource.status == "published"
    )
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export default async function Page() {
  const postPosts = await getResources()

  const activeCategory = {
    category: "Educational Resources",
    emoji: "📚",
  }

  return (
    <>
      <HeroBanner
        title="Community Hub"
        subtitle="Learn about Uniswap v4, with these educational resources"
      >
        <p className="-mt-6 text-base text-gray-900">
          Do you have a resource you&apos;d like to add?{" "}
          <Link
            className="text-pink-600 hover:underline"
            href="/dashboard/resource/submit"
          >
            Add it here
          </Link>
          .
        </p>
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <CollectionLinks
          // @ts-ignore: Showcases the CollectionLinks component
          activeCollection={sections}
          activeCategory={activeCategory}
          // @ts-ignore: Showcases the CollectionLinks component
          componentsData={sections}
        />
        <div className="h-8" />
        <ResourceGrid resourcePosts={postPosts} />
      </Container>
    </>
  )
}
