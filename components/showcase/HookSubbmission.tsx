import Container from "@component/overall/Container";
import SplashButton from "@component/ui/SplashButton";
import HookOwned from "@component/showcase/hook/HookOwned";
import { CategoryType } from "@/types/hook";

async function getHook(id: string) {
  const hookFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/hook/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!hookFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hook = await hookFetch.json();
  return hook;
}

export default async function HookSubbmission({
  id,
  categories,
}: {
  id: string;
  categories: CategoryType[];
}) {
  const hook = await getHook(id);

  return (
    <Container classNames="-mx-2 flex flex-col justify-center items-center">
      <HookOwned componentData={hook} role="user" categories={categories} />
      <div className="h-8" />
      <SplashButton href="/dashboard" id={"home"}>
        <span>🏠</span> Back to home
      </SplashButton>
    </Container>
  );
}
