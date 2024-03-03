import { notFound } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import HookGrid from "@component/showcase/hook/HookGrid";
import { DashboardHeader } from "@component/dashboard/Header";

import SplashButton from "@component/ui/SplashButton";
import { EmptyPlaceholder } from "@component/ui/EmptyPlaceholder";

export const metadata = {
  title: "Resources",
  description: "Where your resources are.",
};

async function getResources({ id }: { id?: string | null | undefined }) {
  return [];
}

export default async function Resources() {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }

  // @ts-ignore: ID is not undefined
  const resources = await getResources({ id: user.id });

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
          <HookGrid hookPosts={resources} owned={true} />
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
              <span>➕ </span> Add a new hook
            </SplashButton>
          </EmptyPlaceholder>
        )}
      </Container>
    </main>
  );
}
