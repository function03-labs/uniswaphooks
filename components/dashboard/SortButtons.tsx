"use client"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { SplashButton } from "@/components/ui/SplashButton"

export function SortButtons() {
  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            🔍
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              value="latest"
              onClick={() => {
                window.location.href = "/dashboard?sort=latest"
              }}
            >
              By latest
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="oldest"
              onClick={() => {
                window.location.href = "/dashboard?sort=oldest"
              }}
            >
              By oldest
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            📁
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              value="published"
              onClick={() => {
                window.location.href = "/dashboard?filter=published"
              }}
            >
              ✅ Approved
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="pending"
              onClick={() => {
                window.location.href = "/dashboard?filter=pending"
              }}
            >
              🟨 Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="draft"
              onClick={() => {
                window.location.href = "/dashboard?filter=draft"
              }}
            >
              ⬛ Draft
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="declined"
              onClick={() => {
                window.location.href = "/dashboard?filter=declined"
              }}
            >
              ❌ Declined
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SplashButton href="/dashboard/hook/submit" id={"add-hook"}>
        <span>➕</span> Add a new hook
      </SplashButton>
    </div>
  )
}
