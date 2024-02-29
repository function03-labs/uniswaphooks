"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import { SidebarNavItem } from "@/types";

import { Tabs } from '@geist-ui/core'
import { Icons } from "@component/overall/Icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <Tabs initialValue="1">
      <Tabs.Item label={<><Icons.post /> Hooks</>} value="1" />
      <Tabs.Item label={<><Icons.book /> Resources</>} value="2" />
      <Tabs.Item label={<><Icons.user /> Profile</>} value="3" />
    </Tabs>
  );
}
