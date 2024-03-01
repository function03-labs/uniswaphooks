"use client";

import { SidebarNavItem } from "@/types";
import { usePathname, useRouter } from "next/navigation";

import { Tabs } from "@geist-ui/core";
import { Icons } from "@component/overall/Icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const router = useRouter();

  if (!items?.length) {
    return null;
  }

  let activeIndex = items.findIndex((item) => item.href === path);

  return (
    <Tabs
      initialValue={activeIndex.toString()}
      activeClassName="font-semibold"
      onChange={(value) => {
        const item = items[parseInt(value)];
        router.push(item.href!);
      }}
    >
      {items.map((item, index) => {
        const Icon = Icons[item.icon as keyof typeof Icons];
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
        );
      })}
    </Tabs>
  );
}

DashboardNav.Skeleton = function DashboardNavSkeleton() {
  return (
    <Tabs initialValue="0">
      <Tabs.Item value="0" label="Loading" />
    </Tabs>
  );
};
