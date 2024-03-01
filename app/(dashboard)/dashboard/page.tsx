import { notFound } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import HookGrid from "@component/showcase/hook/HookGrid";
import { DashboardHeader } from "@component/dashboard/Header";

import SplashButton from "@component/ui/SplashButton";
import { EmptyPlaceholder } from "@component/ui/EmptyPlaceholder";

export const metadata = {
  title: "Hooks",
  description: "Manage your hooks with ease.",
};

async function getHooks({ id }: { id?: string | null | undefined }) {
  const hooksFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_DEV}/api/hook`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hooks = await hooksFetch.json();
  hooks.data = hooks.data.filter((hook: any) => hook.user.id === id);

  return hooks.data;
}

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }

  // @ts-ignore: ID is not undefined
  const hooks = await getHooks({ id: user.id });

  return (
    <main>
      <DashboardHeader
        heading="Manage your hooks with ease."
        text="Create, edit, and manage your hooks."
      >
        <SplashButton href="/dashboard/hook/submit" id={"add-hook"}>
          <span>➕</span> Add a new hook
        </SplashButton>
      </DashboardHeader>

      <Container classNames="py-8 lg:py-6 space-y-8 lg:space-y-0">
        {hooks?.length ? (
          <HookGrid hookPosts={hooks} owned={true} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No hooks created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any hooks created yet. Get started by adding a
              new
            </EmptyPlaceholder.Description>
            <SplashButton href="/dashboard/hook/submit" id={"add-new-hook"}>
              <span>➕ </span> Add a new hook
            </SplashButton>
          </EmptyPlaceholder>
        )}
      </Container>
    </main>
  );
}
