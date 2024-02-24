import { ResourcePost } from "@/types/post";
import ResourceCard from "@/components/showcase/resource/ResourceCard";

export default function ResourceGrid({
  resourcePosts,
}: {
  resourcePosts: ResourcePost[];
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resourcePosts.map((resourcePost) => (
        <li key={resourcePost.id}>
          <ResourceCard resourcePost={resourcePost} />
        </li>
      ))}
    </ul>
  );
}
