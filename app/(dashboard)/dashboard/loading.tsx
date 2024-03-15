import { PostItem } from "@component/dashboard/PostItem";
import { DashboardShell } from "@component/dashboard/Shell";
import { DashboardHeader } from "@component/dashboard/Header";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage your hooks with ease."
        text="Create, edit, and manage your hooks."
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </ul>
    </DashboardShell>
  );
}
