"use client";

import { Tree } from "@geist-ui/core";
import { TreeType } from "@/types/tree";

import { useRouter } from "next/navigation";
import { useSelectedPath } from "@component/config/FileSelected";

export function FileTree({
  nodes,
  hookId,
}: {
  nodes: TreeType[];
  hookId: string;
}) {
  const router = useRouter();
  const { addSelectedPath } = useSelectedPath();

  const renderTreeNodes = (nodes: TreeType[] = []) => {
    return nodes.map((node) => {
      if (node.type === "directory") {
        return (
          <Tree.Folder name={node.name} key={node.path}>
            {renderTreeNodes(node.files)}
          </Tree.Folder>
        );
      } else {
        return <Tree.File name={node.name} key={node.path} />;
      }
    });
  };

  return (
    <Tree
      value={nodes}
      onClick={(path) => {
        router.push(`/hooks/hook/${hookId}?path=${path}`);
        addSelectedPath(path);
      }}
    >
      {renderTreeNodes(nodes)}
    </Tree>
  );
}
