import { HookType } from "@/types/hook"
import { TreeFile } from "@/types/tree"

import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import { Separator } from "@/components/ui/Separator"
import { FileTree } from "@/components/ui/Tree"

export function FileExplorer({
  tree,
  hook,
}: {
  tree: TreeFile[]
  hook: HookType
}) {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>File explorer</DrawerTitle>
        <DrawerDescription>
          {hook.title} - {hook.description}
        </DrawerDescription>
        <Separator />
      </DrawerHeader>
      <div className="max-h-96 overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
        <FileTree nodes={tree} hookId={hook.id} />
      </div>
    </DrawerContent>
  )
}
