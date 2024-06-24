import { redirect } from "next/navigation"
import { getCurrentUser } from "@lib/session"

import { EmptyPlaceholder } from "@/components/ui/EmptyPlaceholder"
import { SplashButton } from "@/components/ui/SplashButton"
import { DashboardHeader } from "@/components/dashboard/Header"
import { SortButtons } from "@/components/dashboard/SortButtons"
import { Container } from "@/components/overall/Container"
import { HookGrid } from "@/components/showcase/hook/HookGrid"

export const metadata = {
  title: "Hooks",
  description: "Manage your hooks with ease.",
}

async function fetchCategories() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`)
    const response = await data.json()

    return response.data
  } catch (error) {
    console.error("Category fetch error:", error)
  }
}

async function getHooks({
  id,
  isAdmin,
}: {
  id?: string | null | undefined
  isAdmin: boolean
}) {
  const hooksFetch = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hook`, {
    next: {
      revalidate: 0,
    },
  })

  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks")
  }

  const hooks = await hooksFetch.json()

  if (isAdmin) {
    return hooks.data
  }

  return hooks.data.filter((hook: any) => hook.user.id === id)
}

function getSortedHooks(
  hooks: any,
  sort: string | string[] | undefined,
  filter: string | string[] | undefined
) {
  if (sort === "latest") {
    hooks.sort((a: any, b: any) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  } else if (sort === "oldest") {
    hooks.sort((a: any, b: any) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    })
  }

  if (filter === "pending") {
    return hooks.filter((hook: any) => hook.status === "pending")
  } else if (filter === "published") {
    return hooks.filter((hook: any) => hook.status === "published")
  } else if (filter === "draft") {
    return hooks.filter((hook: any) => hook.status === "draft")
  } else if (filter === "declined") {
    return hooks.filter((hook: any) => hook.status === "declined")
  }

  return hooks
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const categories = await fetchCategories()
  const hooks = await getHooks({ id: user.id, isAdmin: user.role === "admin" })
  const sortedHooks = getSortedHooks(
    hooks,
    searchParams.sort,
    searchParams.filter
  )

  return (
    <main>
      <DashboardHeader
        heading="Manage your hooks with ease."
        text="Create, edit, and manage your hooks."
      >
        <SortButtons />
      </DashboardHeader>

      <Container classNames="py-8 lg:py-6 space-y-8 lg:space-y-0">
        {sortedHooks?.length ? (
          <HookGrid
            hookPosts={sortedHooks}
            owned={true}
            role={user.role}
            categories={categories}
          />
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
  )
}
