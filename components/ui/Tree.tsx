"use client";

import { useState } from "react";

export function Tree({ nodes }: { nodes: any[] }) {
  const [openPaths, setOpenPaths] = useState<string[]>([]);

  const toggleOpen = (path: string) => {
    setOpenPaths((currentPaths) =>
      currentPaths.includes(path)
        ? currentPaths.filter((p) => p !== path)
        : [...currentPaths, path]
    );
  };

  return (
    <ul className="tree">
      {nodes.map((node) => (
        <li
          key={node.path}
          className={node.type === "directory" ? "directory" : "file"}
        >
          {node.type === "directory" ? (
            <>
              <div
                className="directory-name"
                onClick={() => toggleOpen(node.path)}
              >
                {openPaths.includes(node.path) ? "📂" : "📁"} {node.name}
              </div>
              {openPaths.includes(node.path) && <Tree nodes={node.children} />}
            </>
          ) : (
            <span className="file-name">{node.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
