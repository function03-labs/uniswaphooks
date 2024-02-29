import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Community Hub",
      href: "/community",
    },
    {
      title: "Change Logs",
      href: "https://uniswap-changelog.vercel.app",
    },
  ],
  sidebarNav: [
    {
      title: "Hooks",
      href: "/dashboard/hooks",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/resources",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/profile",
      icon: "settings",
    },
  ],
};
