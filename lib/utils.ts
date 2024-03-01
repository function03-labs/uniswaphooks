import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
