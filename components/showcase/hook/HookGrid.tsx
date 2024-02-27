import { HookProps } from "@/types/hook";
import HookCard from "@/components/showcase/hook/HookCard";

export default function HookGrid({ hookPosts }: { hookPosts: HookProps[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hookPosts.map((hookPost) => (
        <li key={hookPost.id}>
          <HookCard componentData={hookPost} />
        </li>
      ))}
    </ul>
  );
}
