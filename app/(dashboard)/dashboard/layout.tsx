import { notFound } from "next/navigation";

import { supabaseAdmin } from "@lib/supabase";
import { dashboardConfig } from "@config/dashboard";

import { MainNav } from "@component/navigation/DashboardNav";
import { DashboardNav } from "@component/dashboard/Navigation";
import { UserAccountNav } from "@/components/user-account-nav";

interface DashboardLayoutProps {
  params: any;
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  /* //localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6ImpKYS9DbGJYWExHVHk3UE8iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA5MDgzNjE4LCJpYXQiOjE3MDkwODAwMTgsImlzcyI6Imh0dHBzOi8venNleGtucGtpa2huZXRnZG9heXYuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjJjMWE2ZWY3LTU0YmItNGExMy04YjY2LTM2OWUyN2QxMGM1MyIsImVtYWlsIjoibWFsZWtnYXJhaGVsbGFsYnVzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTcwOTA4MDAxOH1dLCJzZXNzaW9uX2lkIjoiMzE3MmE4NTYtZTI1Zi00ZTY4LTkyYTEtZTdiM2ZiYTkyZDBiIn0.XjCdYyWLTSZgjR9ief_lJrsCKnoIkhTCQoXWjoBm7kI&expires_at=1709083618&expires_in=3600&refresh_token=b6jR7m8InijCZ7_UwRoJVg&token_type=bearer&type=magiclink*/

  // get the token from the url
  /*   console.log("params", params);
  const token = params.access_token || "";
  const email = params.email || "";

  console.log("token", token);

  const { data: user, error } = await supabaseAdmin.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (!user || error) {
    return notFound();
  } */

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
