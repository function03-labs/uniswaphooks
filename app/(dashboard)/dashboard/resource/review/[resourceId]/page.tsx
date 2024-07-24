import { notFound } from "next/navigation"
import { getCurrentUser } from "@lib/session"

import { ResourcePost } from "@/types/post"

import { ReviewResource } from "@/components/form/ReviewResource"
import { Container } from "@/components/overall/Container"
import { HeroBanner } from "@/components/section/HeroBanner"
import { ResourceCard } from "@/components/showcase/resource/ResourceOwned"

async function getResource({ resourceId }: { resourceId: string }) {
  const ResourceFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/resource/${resourceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  )

  if (!ResourceFetch.ok) {
    throw new Error("Failed to fetch Resource")
  }

  const Resource = await ResourceFetch.json()

  return Resource
}

export default async function ReviewPage({
  params,
}: {
  params: { resourceId: string }
}) {
  const user = await getCurrentUser()

  if (!user || !(user.role === "admin")) {
    return notFound()
  }

  const resource = (await getResource({
    resourceId: params.resourceId,
  })) as ResourcePost

  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <HeroBanner
        title="Review Resource"
        subtitle="Review the Resource and approve or reject it."
      />
      <ResourceCard resourcePost={resource} />
      <ReviewResource resource={resource} />
    </Container>
  )
}
