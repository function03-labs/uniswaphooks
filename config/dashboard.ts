import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
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
