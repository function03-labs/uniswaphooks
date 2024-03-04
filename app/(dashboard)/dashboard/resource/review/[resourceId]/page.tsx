import { notFound } from "next/navigation";
import { ResourcePost } from "@/types/post";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import ReviewResource from "@component/form/ReviewResource";
import ResourceOwned from "@component/showcase/resource/ResourceOwned";

async function getResource({ resourceId }: { resourceId: string }) {
  const ResourceFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_DEV}/api/resource/${resourceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!ResourceFetch.ok) {
    throw new Error("Failed to fetch Resource");
  }

  const Resource = await ResourceFetch.json();

  return Resource;
}

export default async function ReviewPage({ params }: { params: { resourceId: string } }) {
  const user = await getCurrentUser();

  if (!user || !(user.role === "admin")) {
    return notFound();
  }

  const resource = (await getResource({
    resourceId: params.resourceId,
  })) as ResourcePost;

  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <HeroBanner
        title="Review Resource"
        subtitle="Review the Resource and approve or reject it."
      />
      <ResourceOwned resourcePost={resource} />
      <ReviewResource resource={resource} />
    </Container>
  );
}
