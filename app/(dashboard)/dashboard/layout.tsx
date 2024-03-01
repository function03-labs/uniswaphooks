import { notFound } from "next/navigation";

import { getCurrentUser } from "@lib/session";
import { dashboardConfig } from "@config/dashboard";

import SplashButton from "@component/ui/SplashButton";
import { MainNav } from "@component/navigation/DashboardNav";
import { DashboardNav } from "@component/dashboard/Navigation";
import { UserAccountNav } from "@component/dashboard/UserAccountNav";

export const metadata = {
  title: "Hooks",
  description: "Manage your hooks with ease.",
};

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <SplashButton
                id="submit-button"
                href="https://uniswaphooks.com/add-new-hook"
              >
                <span className="mr-2">🎉</span> Submit A Hook
              </SplashButton>
            </div>
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </div>
        <nav className="container">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </nav>
      </header>
      <main className="container overflow-hidden py-2">{children}</main>
    </div>
  );
}
