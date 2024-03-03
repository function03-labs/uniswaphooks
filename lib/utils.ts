import { HookType } from "@/types/hook";
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
    networkName: network.name,
    imageUrl: network.imageUrl,
    verified: network.verified,
    input: {
      deploymentAddress: contract.deploymentAddress || "",
      network: network.id,
    },
    contract: {
      contractName: contract.contractName,
      deploymentAddress: contract.deploymentAddress,
      compilerVersion: contract.compilerVersion,
      creator: contract.creator,
      transactionHash: contract.transactionHash,
    },
    date: {
      date: deploymentDate.date,
      dateTime: deploymentDate.datetime,
    },
  };

  return deploymentDetails;
}
