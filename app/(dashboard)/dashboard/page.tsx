import { notFound } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import HookGrid from "@component/showcase/hook/HookGrid";

async function getHooks({ email }: { email?: string | null | undefined }) {
  // Using the URL we would fetch Hooks per user
  const hooksFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hook`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hooks = await hooksFetch.json();
  return hooks.data;
}

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }

  const hooks = await getHooks({ email: user.email });

  return (
    <Container classNames="py-8 lg:py-4 space-y-8 lg:space-y-0">
      <HookGrid hookPosts={hooks} owned={true} />
    </Container>
  );
}
