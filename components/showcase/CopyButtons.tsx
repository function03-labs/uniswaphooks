"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { Icons } from "@/components/overall/Icons"

export function CopyButtons({ code, link }: { code: string; link: string }) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => setCopiedCode(true))
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => setCopiedLink(true))
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-3">
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="outline"
              className="h-5 w-5"
              onClick={handleCopyCode}
            >
              {copiedCode ? <Icons.check /> : <Icons.copy />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-sm font-normal">
            {copiedCode ? "Code copied!" : "Copy the code to clipboard"}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="outline"
              className="h-5 w-5"
              onClick={handleCopyLink}
            >
              {copiedLink ? <Icons.check /> : <Icons.link />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-sm font-normal">
            {copiedLink ? "Link copied!" : "Copy the link to clipboard"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
