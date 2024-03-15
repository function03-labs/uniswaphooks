import { PostItem } from "@component/dashboard/PostItem";
import { DashboardShell } from "@component/dashboard/Shell";
import { DashboardHeader } from "@component/dashboard/Header";

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
  );
}
