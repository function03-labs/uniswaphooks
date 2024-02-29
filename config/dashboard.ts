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
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: "book",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
    },
  ],
};
