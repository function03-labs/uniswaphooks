import { DashboardHeader } from "@/components/dashboard/Header"
import { PostItem } from "@/components/dashboard/PostItem"
import { DashboardShell } from "@/components/dashboard/Shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile and account settings."
      />
      <ul>
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </ul>
    </DashboardShell>
  )
}
