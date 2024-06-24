"use client"

import { useState } from "react"

import { Card } from "@/components/ui/Card"
import { Icons } from "@/components/overall/Icons"

export function AddressCopy({ ethAddress }: { ethAddress: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(ethAddress)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      })
      .catch((err) => console.error("Could not copy text: ", err))
  }

  return (
    <Card className="rounded-sm">
      <div
        onClick={handleCopyClick}
        className="flex cursor-pointer items-center space-x-2 px-2 py-1 transition-colors duration-200 ease-in-out hover:text-blue-800"
      >
        <p className="hidden truncate font-mono text-gray-500 transition-colors duration-200 ease-in-out hover:text-blue-500 lg:block">
          {`${ethAddress.substring(0, 8)}...${ethAddress.substring(
            ethAddress.length - 8
          )}`}
        </p>
        <p className="block truncate font-mono text-gray-500 transition-colors duration-200 ease-in-out hover:text-blue-500 lg:hidden">
          {`${ethAddress.substring(0, 8)}...${ethAddress.substring(
            ethAddress.length - 4
          )}`}
        </p>

        {isCopied ? (
          <Icons.check className="h-4 w-4 text-blue-500" />
        ) : (
          <Icons.copy className="h-4 w-4" />
        )}
      </div>
    </Card>
  )
}
