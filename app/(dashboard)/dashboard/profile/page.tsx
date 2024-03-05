import { redirect } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import ProfileForm from "@component/form/ProfileForm";
import { DashboardHeader } from "@component/dashboard/Header";

export const metadata = {
  title: "Profile",
  description: "Your profile settings.",
};

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile and account settings."
      />
      <ProfileForm user={user} />
    </main>
  );
}
