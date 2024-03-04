import { notFound } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";
import NewResourceForm from "@component/form/NewResource";

export const metadata = {
  title: "Submit your resource",
  description:
    "Submit your resource, and we'll review it for inclusion in the marketplace.",
};

export default async function SubmitResourcePage() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }
  return (
    <Container classNames="max-w-md lg:px-48 pb-8 lg:pb-12">
      <HeroBanner
        title="Add a new resource"
        subtitle="Please ensure your resource adheres to the standards and guidelines of the UniswapHooks community."
      />

      <NewResourceForm user={user} />
    </Container>
  );
}
