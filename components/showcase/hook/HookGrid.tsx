import { HookType } from "@/types/hook";
import HookCard from "@/components/showcase/hook/HookCard";
import HookOwned from "@/components/showcase/hook/HookOwned";

export default function HookGrid({
  hookPosts,
  owned,
}: {
  hookPosts: HookType[];
  owned: boolean;
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {owned ? (
        <>
          {hookPosts.map((hookPost) => (
            <li key={hookPost.id}>
              <HookOwned componentData={hookPost} />
            </li>
          ))}
        </>
      ) : (
        <>
          {hookPosts.map((hookPost) => (
            <li key={hookPost.id}>
              <HookCard componentData={hookPost} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
