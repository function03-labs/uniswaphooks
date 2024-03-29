import { HookType } from "@/types/hook";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@lib/session";
import { formatDeploymentDetails } from "@lib/utils";

import ReviewHook from "@component/form/ReviewHook";
import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import HookOwned from "@component/showcase/hook/HookOwned";
import DeploymentDetails from "@component/showcase/DeploymentDetails";

async function fetchCategories() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`);
    const response = await data.json();

    return response.data;
  } catch (error) {
    console.error("Category fetch error:", error);
  }
}

async function getHook({ hookId }: { hookId: string }) {
  const hookFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/hook/${hookId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!hookFetch.ok) {
    throw new Error("Failed to fetch hook");
  }

  const hook = await hookFetch.json();

  return hook;
}

export default async function ReviewPage({
  params,
}: {
  params: { hookId: string };
}) {
  const user = await getCurrentUser();

  if (!user || !(user.role === "admin")) {
    return notFound();
  }

  const categories = await fetchCategories();
  const hook = (await getHook({ hookId: params.hookId })) as HookType;
  const deploymentDetails = formatDeploymentDetails(hook);

  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <HeroBanner
        title="Review hook"
        subtitle="Review the hook and approve or reject it."
      />
      <HookOwned
        componentData={hook}
        role={user.role}
        categories={categories}
      />
      <DeploymentDetails deployment={deploymentDetails} />
      <ReviewHook hook={hook} />
    </Container>
  );
}
