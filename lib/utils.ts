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