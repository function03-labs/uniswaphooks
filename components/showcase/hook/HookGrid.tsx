import { CategoryType, HookType } from "@/types/hook"

import { ComponentPreview } from "@/components/showcase/hook/HookCard"
import { HookOwned } from "@/components/showcase/hook/HookOwned"

export function HookGrid({
  hookPosts,
  owned,
  role,
  categories,
}: {
  hookPosts: HookType[]
  owned: boolean
  role: string
  categories?: CategoryType[]
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {owned && categories ? (
        <>
          {hookPosts.map((hookPost) => (
            <li key={hookPost.id}>
              <HookOwned
                componentData={hookPost}
                categories={categories}
                role={role}
              />
            </li>
          ))}
        </>
      ) : (
        <>
          {hookPosts.map((hookPost) => (
            <li key={hookPost.id}>
              <ComponentPreview componentData={hookPost} />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
