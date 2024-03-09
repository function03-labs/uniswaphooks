"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@component/ui/HoverCard";
import { DrawerTrigger } from "@component/ui/Drawer";

import { Button } from "@component/ui/Button";
import { Icons } from "@component/overall/Icons";

export function CopyButtons({ code, link }: { code: string; link: string }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => setCopiedCode(true));
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => setCopiedLink(true));
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex items-center space-x-3">
      <HoverCard>
        <HoverCardTrigger>
          <Button
            size="icon"
            variant="outline"
            className="w-5 h-5"
            onClick={handleCopyCode}
          >
            {copiedCode ? <Icons.check /> : <Icons.copy />}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm font-normal">
          {copiedCode ? "Code copied!" : "Copy the code to clipboard"}
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger>
          <Button
            size="icon"
            variant="outline"
            className="w-5 h-5"
            onClick={handleCopyLink}
          >
            {copiedLink ? <Icons.check /> : <Icons.link />}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm font-normal">
          {copiedLink ? "Link copied!" : "Copy the link to clipboard"}
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger>
          <DrawerTrigger>
            <Button size="icon" variant="outline" className="w-5 h-5 md:hidden">
              <Icons.orderbook />
            </Button>
          </DrawerTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm font-normal">
          Open file explorer
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
