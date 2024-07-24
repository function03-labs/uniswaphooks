import { ResourcePost } from "@/types/post"

import { ResourceCard } from "@/components/showcase/resource/ResourceCard"
import { ResourceCard as ResourceOwned } from "@/components/showcase/resource/ResourceOwned"

export function ResourceGrid({
  resourcePosts,
  owned,
}: {
  resourcePosts: ResourcePost[]
  owned?: boolean
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {!owned ? (
        <>
          {resourcePosts.map((resourcePost) => (
            <li key={resourcePost.id}>
              <ResourceCard resourcePost={resourcePost} />
            </li>
          ))}
        </>
      ) : (
        <>
          {resourcePosts.map((resourcePost) => (
            <li key={resourcePost.id}>
              <ResourceOwned resourcePost={resourcePost} />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
