import Container from "@component/overall/Container";
import { PostItem } from "@component/dashboard/PostItem";
import { DashboardShell } from "@component/dashboard/Shell";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@component/ui/Resizable";

export default function DashboardLoading() {
  return (
    <Container>
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
    </Container>
  );
}