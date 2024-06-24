"use client"

import { usePathname, useRouter } from "next/navigation"
import { SidebarNavItem } from "@/types"
import { Tabs } from "@geist-ui/core"

import { Icons } from "@/components/shared/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()
  const router = useRouter()

  if (!items?.length) {
    return null
  }

  let activeIndex
  switch (path) {
    case "/dashboard/hook/submit":
      activeIndex = 0
      break
    case "/dashboard/resources/submit":
      activeIndex = 1
      break
    default:
      activeIndex = items.findIndex((item) => item.href === path)
      break
  }

  return (
    <Tabs
      initialValue={activeIndex.toString()}
      activeClassName="font-semibold"
      onChange={(value) => {
        const item = items[parseInt(value)]
        router.push(item.href!)
      }}
    >
      {items.map((item, index) => {
        const Icon = Icons[item.icon as keyof typeof Icons]
        return (
          <Tabs.Item
            key={index}
            value={index.toString()}
            label={
              <>
                <Icon src="" alt={item.title} /> {item.title}
              </>
            }
          />
        )
      })}
    </Tabs>
  )
}
