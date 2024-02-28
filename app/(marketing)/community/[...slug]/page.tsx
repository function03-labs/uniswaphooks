import Link from "next/link";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import NewResourceForm from "@component/form/NewResource";
import CollectionLinks from "@component/ui/CollectionLinks";
import ResourceGrid from "@component/showcase/resource/ResourceGrid";

import { ResourcePost } from "@/types/post";
import { sections } from "@config/community";

async function getResources() {
  try {
    const responseResources = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resource?${Date.now()}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    ).then((res) => res.json());

    return responseResources.data.filter(
      (resource: ResourcePost) => resource.status == "published"
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  if (params.slug && params.slug == "new") {
    const activeCategory = {
      category: "New Resource",
      emoji: "📝",
    };

    return (
      <>
        <HeroBanner
          title="Add a new Resource"
          subtitle="Help the community by adding a new resource, and share your knowledge."
        >
          <p className="-mt-6 text-base text-gray-900">
            We will review it and add it to the list.
          </p>
        </HeroBanner>

        <Container classNames="pb-8 lg:pb-12">
          <CollectionLinks
            activeCollection={params.slug}
            activeCategory={activeCategory}
            // @ts-ignore: Showcases the CollectionLinks component
            componentsData={sections}
          />
          <NewResourceForm />
        </Container>
      </>
    );
  } else if (
    params.slug &&
    sections.find((section) => section.id == params.slug)
  ) {
    const postPosts = await getResources();
    const postPostsFromSection = postPosts.filter(
      (post: ResourcePost) => post.section == params.slug
    );

    const activeCategory = {
      category: "Educational Resources",
      emoji: "📚",
    };
    console.log(params.slug);
    console.log(activeCategory);
    console.log(sections);
    return (
      <>
        <HeroBanner
          title={params.slug[0]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          subtitle="Learn about Uniswap v4, with these educational resources"
        >
          <p className="-mt-6 text-base text-gray-900">
            Do you have a resource you&apos;d like to add?{" "}
            <Link
              className="text-pink-600 hover:underline"
              href="/community/new"
            >
              Add it here
            </Link>
            .
          </p>
        </HeroBanner>

        <Container classNames="pb-8 lg:pb-12">
          <CollectionLinks
            activeCollection={params.slug[0]}
            activeCategory={activeCategory}
            // @ts-ignore: Showcases the CollectionLinks component
            componentsData={sections}
          />
          <div className="h-8" />
          <ResourceGrid resourcePosts={postPostsFromSection} />
        </Container>
      </>
    );
  }
}
