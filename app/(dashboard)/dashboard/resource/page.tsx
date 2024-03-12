import { redirect } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import { DashboardHeader } from "@component/dashboard/Header";
import ResourceGrid from "@component/showcase/resource/ResourceGrid";

import SplashButton from "@component/ui/SplashButton";
import { EmptyPlaceholder } from "@component/ui/EmptyPlaceholder";

export const metadata = {
  title: "Resources",
  description: "Where your resources are.",
};

async function getResources({
  id,
  isAdmin,
}: {
  id?: string | null | undefined;
  isAdmin: boolean;
}) {
  const resourceFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resource`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!resourceFetch.ok) {
    throw new Error("Failed to fetch Resources");
  }

  const resources = await resourceFetch.json();

  if (isAdmin) {
    return resources.data;
  }

  const userResources = resources.data.filter(
    (resource: any) => resource.userId === id
  );

  return userResources;
}

export default async function Resources() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const resources = await getResources({
    id: user.id,
    isAdmin: user.role === "admin",
  });

  return (
    <main>
      <DashboardHeader
        heading="Resources"
        text="Where you can find your resources and manage them."
      >
        <SplashButton href="/dashboard/resource/submit" id={"add-resource-new"}>
          <span>➕</span> Add a new resource
        </SplashButton>
      </DashboardHeader>

      <Container classNames="py-8 lg:py-6 space-y-8 lg:space-y-0">
        {resources?.length ? (
          <ResourceGrid resourcePosts={resources} owned={true} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>
              No resources created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any resources created yet. Get started by
              adding a new
            </EmptyPlaceholder.Description>
            <SplashButton
              href="/dashboard/resource/submit"
              id={"add-new-resource"}
            >
              <span>➕ </span> Submit your first resource
            </SplashButton>
          </EmptyPlaceholder>
        )}
      </Container>
    </main>
  );
}
