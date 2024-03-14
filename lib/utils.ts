import { HookType } from "@/types/hook";
import { TreeType, TreeFile } from "@/types/tree";

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DeploymentType } from "@/types/deployment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  let chunks = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks += new TextDecoder().decode(value);
  }

  return chunks;
}

export function extractCreator(github: string) {
  return github.split("/")[3];
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDeploymentDetails(hook: HookType): DeploymentType {
  const { network, contract, deploymentDate } = hook;

  const deploymentDetails: DeploymentType = {
    networkName: network?.name ?? "",
    imageUrl: network?.imageUrl ?? "",
    verified: network?.verified ?? false,
    input: {
      deploymentAddress: contract?.deploymentAddress ?? "",
      network: network?.id ?? "",
    },
    contract: {
      contractName: contract?.contractName ?? "",
      deploymentAddress: contract?.deploymentAddress ?? "",
      compilerVersion: contract?.compilerVersion ?? "",
      creator: contract?.creator ?? "",
      transactionHash: contract?.transactionHash ?? "",
    },
    date: {
      date: deploymentDate?.date ?? "",
      dateTime: deploymentDate?.datetime ?? "",
    },
  };

  return deploymentDetails;
}

export function findFile(
  nodes: TreeType[],
  path: string
): TreeFile | undefined {
  for (let node of nodes) {
    if (node.type === "directory") {
      const found = findFile(node.files, path);
      if (found) return found;
    } else if (node.path === path) {
      return node;
    }
  }
}

export function cleanFiles(files: File[]) {
  const excludedFolders = [/\/node_modules\//, /\/.git\//];
  const imageExtensions = [
    ".ico",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".svg",
  ];

  return files.filter((file) => {
    const isExcludedFolder = excludedFolders.some((folder) =>
      folder.test(file.name)
    );

    const isImage = imageExtensions.some((ext) => file.name.endsWith(ext));

    return !isExcludedFolder && !isImage;
  });
}

export function getItemType(entity: any) {
  if (entity.metadata) {
    return "file";
  }

  return "directory";
}
