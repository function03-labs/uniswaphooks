"use client"

import { Copy } from "lucide-react"

export function CopyOutput({ value }: { value: string }) {
  return (
    <Copy
      onClick={() => {
        navigator.clipboard.writeText(value)
      }}
      width={20}
    />
  )
}
