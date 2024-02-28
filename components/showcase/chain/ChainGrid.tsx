import { ChainPost } from "@/types/chain";
import ChainCard from "@/components/showcase/chain/ChainCard";

export default function ChainGrid({ chainPosts }: { chainPosts: ChainPost[] }) {
  return (
<div className="flex flex-wrap gap-4 justify-center items-center">
  {chainPosts.map((chainPost) => (
    <div
      key={chainPost.slug}
      className="w-[370px] flex-none" 
    >
      <ChainCard {...chainPost} />
    </div>
  ))}
</div>

  );
}
