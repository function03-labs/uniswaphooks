import { Skeleton } from "@component/ui/Skeleton";
import { PostItem } from "@component/dashboard/PostItem";
import { DashboardShell } from "@component/dashboard/Shell";
import { DashboardHeader } from "@component/dashboard/Header";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <nav className="flex gap-2 mb-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </nav>
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
