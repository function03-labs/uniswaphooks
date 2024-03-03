import { PostItem } from "@component/dashboard/PostItem";
import { DashboardShell } from "@component/dashboard/Shell";
import { DashboardHeader } from "@component/dashboard/Header";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Resources"
        text="Where you can find your resources and manage them."
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
