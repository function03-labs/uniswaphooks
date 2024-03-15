import { CategoryType, HookType } from "@/types/hook";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";

import HeaderSearch from "@component/showcase/HeaderSearch";
import VerifiedHooks from "@component/showcase/VerifiedHooks";
import CollectionCard from "@component/showcase/CollectionCard";

async function getHooks() {
  const hooksFetch = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hook`, {
    method: "GET",
    next: {
      revalidate: 15,
    },
  });

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hooks = await hooksFetch.json();
  hooks.data = hooks.data.filter(
    (hook: HookType) => hook.status === "published"
  );

  return hooks.data;
}

async function getCategories(hooks: HookType[]) {
  const categoriesFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/category`,
    {
      method: "GET",
      next: {
        revalidate: 15,
      },
    }
  );

  if (!categoriesFetch.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoriesFetch.json();

  categories.data.forEach((category: CategoryType) => {
    category.count = hooks.filter(
      (hook: any) => hook.category.id === category.id
    ).length;
  });

  categories.data.push({
    id: "community",
    title: "Community Hub",
    description: "Educational resources, and more!",
    emoji: "🌱",
    category: "articles",
    tag: "community",
  });

  return categories.data;
}

export default async function Page() {
  const hooks = (await getHooks()) as HookType[];
  const categories = await getCategories(hooks);

  return (
    <main>
      <HeroBanner
        title="Uniswap v4 Hooks"
        subtitle="Open Source Directory for Uniswap v4 Hooks"
      >
        <p>
          A community-curated collection of open-source hooks for Uniswap v4.
        </p>

        <HeaderSearch
          hooks={hooks.filter(
            (hook: HookType) => hook.storageType === "github"
          )}
        />
        <VerifiedHooks />
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories
            .sort((a: CategoryType, b: CategoryType) =>
              a.title > b.title ? 1 : -1
            )
            .sort((a: CategoryType) => (a.tag === "new" ? -1 : 1))
            .sort((a: CategoryType) => (a.tag === "community" ? -1 : 1))
            .map((collection: CategoryType) => {
              return (
                <li className="space-y-4" key={collection.id}>
                  <CollectionCard componentData={collection} />
                </li>
              );
            })}
        </ul>
      </Container>
    </main>
  );
}
