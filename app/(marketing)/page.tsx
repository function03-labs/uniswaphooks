import { CategoryType } from "@/types/hook";

import Container from "@component/overall/Container";
import HeroBanner from "@component/section/HeroBanner";

import HeaderSearch from "@component/showcase/HeaderSearch";
import VerifiedHooks from "@component/showcase/VerifiedHooks";
import CollectionCard from "@component/showcase/CollectionCard";

async function getCategories() {
  const categoriesFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category`
  );
  const hooksFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hook`);

  if (!categoriesFetch.ok) {
    throw new Error("Failed to fetch categories");
  }

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const categories = await categoriesFetch.json();
  const hooks = await hooksFetch.json();

  categories.data.forEach((category: CategoryType) => {
    category.count = hooks.data.filter(
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
  const categories = await getCategories();

  return (
    <main>
      <HeroBanner
        title="Uniswap v4 Hooks"
        subtitle="Open Source Directory for Uniswap v4 Hooks"
      >
        <p>
          A community-curated collection of hooks implementations for Uniswap v4
          that can be used in your project. Each hook is self-contained and can
          be used independently.
        </p>

        <HeaderSearch />
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
