import { ToolPost } from "@/types/tool"

import { SquareRootPrice } from "@/components/showcase/tool/SquareRootPrice"
import { TickPrice } from "@/components/showcase/tool/TickPrice"

export function ToolForm({
  toolPost,
  params,
}: {
  toolPost: ToolPost
  params: { slug: string }
}) {
  return (
    <div className="group relative block h-full w-full bg-white font-sans before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
      <div className="h-full overflow-auto rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
        <div className="overflow-auto p-4 sm:p-6 lg:p-10">
          <h2 className="flex items-center justify-center text-lg font-medium text-gray-900 sm:text-xl">
            {toolPost.title}
          </h2>
          <p className="mt-2 flex items-center justify-center text-sm text-gray-500">
            {toolPost.description}
          </p>

          {params.slug[0] === "square-root-price" && <SquareRootPrice />}
          {params.slug[0] === "tick-price" && <TickPrice />}
        </div>
      </div>
    </div>
  )
}
