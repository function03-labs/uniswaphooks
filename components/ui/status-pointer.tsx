import React from "react"

import { cn } from "@/lib/utils"

export function StatusPointer(level: { color: string; bgColor: string }) {
  return (
    <span className="relative -mt-3 ml-auto flex size-2">
      <span
        className={cn(
          "absolute inline-flex size-full animate-ping rounded-full opacity-75",
          level.bgColor
        )}
      />
      <span
        className={cn("relative inline-flex size-2 rounded-full", level.color)}
      />
    </span>
  )
}
