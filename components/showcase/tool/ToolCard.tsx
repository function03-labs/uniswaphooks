import Link from "next/link"
import { ToolPost } from "@/types/tool"

import { CardTag } from "@/components/ui/CardTag"

export function ToolCard({ tool }: { tool: ToolPost }) {
  return (
    <Link href={`/tool/${tool.id}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <span
                aria-hidden="true"
                role="img"
                className="text-lg sm:text-xl"
              >
                {tool.emoji}
              </span>

              {tool.tag && <CardTag tagType={tool.tag} />}
            </div>

            <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
              {tool.title}
            </h2>

            <p className="mt-1 text-xs text-gray-700">{tool.description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
