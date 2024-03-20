import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@component/ui/Drawer";
import { FileTree } from "@component/ui/Tree";
import { Separator } from "@component/ui/Separator";

import { TreeFile } from "@/types/tree";
import { HookType } from "@/types/hook";

export function FileExplorer({
  tree,
  hook,
}: {
  tree: TreeFile[];
  hook: HookType;
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
      <div className="px-2 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <FileTree nodes={tree} hookId={hook.id} />
      </div>
    </DrawerContent>
  );
}
