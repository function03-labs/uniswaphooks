import { ChainPost } from "@/types/chain";
import ChainCard from "@/components/showcase/chain/ChainCard";

export default function ChainGrid({ chainPosts }: { chainPosts: ChainPost[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {chainPosts.map((chainPost) => (
        <li key={chainPost.slug}>
          <ChainCard {...chainPost} />
        </li>
      ))}
    </ul>
  );
}
