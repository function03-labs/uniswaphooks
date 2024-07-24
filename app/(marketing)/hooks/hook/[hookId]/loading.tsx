import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"
import { PostItem } from "@/components/dashboard/PostItem"
import { DashboardShell } from "@/components/dashboard/Shell"
import { Container } from "@/components/overall/Container"
import { DeployedDetailSkeleton } from "@/components/showcase/DeploymentDetails"

export default function DashboardLoading() {
  return (
    <Container classNames="py-4 space-y-4">
      <DeployedDetailSkeleton />

      <Card>
        <CardHeader>
          <PostItem.Skeleton />
        </CardHeader>
        <CardContent>
          <PostItem.Skeleton />
        </CardContent>

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={18} className="m-4" minSize={18}>
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={82} minSize={60} className="m-4">
            <DashboardShell>
              <PostItem.Skeleton />
              <PostItem.Skeleton />
              <PostItem.Skeleton />
            </DashboardShell>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </Container>
  )
}
