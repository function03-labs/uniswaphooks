"use client";

import { Tree } from "@geist-ui/core";
import { TreeType } from "@/types/repo";

export function FileTree({ nodes }: { nodes: TreeType[] }) {
  const renderTreeNodes = (nodes: TreeType[] = []) => {
    return nodes.map((node) => {
      if (node.type === "directory") {
        return (
          <Tree.Folder name={node.name} key={node.path}>
            {renderTreeNodes(node.children)}
          </Tree.Folder>
        );
      } else {
        return <Tree.File name={node.name} key={node.path} />;
      }
    });
  };

  return <Tree>{renderTreeNodes(nodes)}</Tree>;
}
