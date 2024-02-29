import Container from "@component/overall/Container";
import HookGrid from "@component/showcase/hook/HookGrid";

async function getHooks() {
  const hooksFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hook`);

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hooks = await hooksFetch.json();
  return hooks.data;
}

export default async function Home() {
  const hooks = await getHooks();
  return (
    <Container classNames="py-8 lg:py-4 space-y-8 lg:space-y-0">
      <HookGrid hookPosts={hooks} />
    </Container>
  );
}
