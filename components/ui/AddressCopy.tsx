"use client";

import { useState } from "react";
import { Icons } from "@component/overall/Icons";
import { Card, CardDescription } from "@component/ui/Card";

export default function AddressCopy({ ethAddress }: { ethAddress: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(ethAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <Card className="rounded-sm">
      <div
        onClick={handleCopyClick}
        className="flex items-center px-2 py-1 space-x-2 hover:text-blue-800 transition-colors duration-200 ease-in-out cursor-pointer"
      >
        <p className="hidden lg:block text-gray-500 font-mono truncate hover:text-blue-500 transition-colors duration-200 ease-in-out">
          {`${ethAddress.substring(0, 8)}...${ethAddress.substring(
            ethAddress.length - 8
          )}`}
        </p>
        <p className="lg:hidden block text-gray-500 font-mono truncate hover:text-blue-500 transition-colors duration-200 ease-in-out">
          {`${ethAddress.substring(0, 8)}...${ethAddress.substring(
            ethAddress.length - 4
          )}`}
        </p>

        {isCopied ? (
          <Icons.check className="w-4 h-4 text-blue-500" />
        ) : (
          <Icons.copy className="w-4 h-4" />
        )}
      </div>
    </Card>
  );
}
