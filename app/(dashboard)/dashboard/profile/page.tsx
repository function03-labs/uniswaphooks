import { DashboardHeader } from "@component/dashboard/Header";

export const metadata = {
  title: "Profile",
  description: "Your profile settings.",
};

export default function Profile() {
  return (
    <main>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile and account settings."
      />
    </main>
  );
}
