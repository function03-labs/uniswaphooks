import { ToolPost } from "@/types/tool";
import ToolCard from "@/components/showcase/tool/ToolCard";

export default function ToolGrid({ tools }: { tools: ToolPost[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tools.map((toolPost) => (
        <li key={toolPost.id} className="space-y-4">
          <ToolCard tool={toolPost} />
        </li>
      ))}
    </ul>
  );
}
