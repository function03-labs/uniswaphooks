import { redirect } from "next/navigation"
import { getCurrentUser } from "@lib/session"

import { DashboardHeader } from "@/components/dashboard/Header"
import { ProfileForm } from "@/components/form/ProfileForm"

export const metadata = {
  title: "Profile",
  description: "Your profile settings.",
}

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile and account settings."
      />
      <ProfileForm user={user} />
    </main>
  )
}
