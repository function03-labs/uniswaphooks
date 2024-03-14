import { findFile } from "@lib/utils";
import { TreeFile, TreeType } from "@/types/tree";
import { HookType } from "@/types/hook";
import { notFound } from "next/navigation";

import { formatDeploymentDetails } from "@lib/utils";
import { FileSelected } from "@component/config/FileSelected";
import { buildTreeGithub, buildTreeNode } from "@lib/file-explorer";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@component/ui/Resizable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@component/ui/Card";
import { FileTree } from "@component/ui/Tree";
import { Button } from "@component/ui/Button";
import { Icons } from "@component/overall/Icons";
import { Separator } from "@component/ui/Separator";
import { SyntaxHighler } from "@component/ui/SyntaxHighler";
import { Drawer, DrawerTrigger } from "@component/ui/Drawer";
import { EmptyPlaceholder } from "@component/ui/EmptyPlaceholder";

import Container from "@component/overall/Container";
import { CopyButtons } from "@component/showcase/CopyButtons";
import { FileExplorer } from "@component/showcase/FileExplorer";
import { SelectedFiles } from "@component/showcase/SelectedFiles";
import { DeployedDetail } from "@component/showcase/DeploymentDetails";

async function getHook({ hookId }: { hookId: string }) {
  const hookFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/hook/${hookId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!hookFetch.ok) {
    throw new Error("Failed to fetch hook");
  }

  const hook = await hookFetch.json();

  return hook;
}

export default async function ViewHook({
  params,
  searchParams,
}: {
  params: { hookId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hook = (await getHook({ hookId: params.hookId })) as HookType;

  if (!hook) {
    return notFound();
  }
  const deploymentDetails = formatDeploymentDetails(hook);

  if (hook.status !== "published") {
    return notFound();
  }

  let tree;
  let file = {} as TreeFile;

  if (hook.storageType === "github") {
    tree = await buildTreeGithub({ github: hook.filePath, path: "" });

    if (searchParams.path) {
      const fileFound = findFile(tree, searchParams.path as string);
      file = fileFound as TreeFile;
      if (fileFound) {
        try {
          const fileFetch = await fetch(fileFound.download_url);
          file.code = await fileFetch.text();
        } catch (error) {
          console.error("Failed to fetch file content:", error);
        }
      }
    }
  } else if (hook.storageType === "storage") {
    tree = await buildTreeNode(params.hookId, "repositories");
    if (searchParams.path) {
      const fileFound = findFile(tree, searchParams.path as string);
      file = fileFound as TreeFile;
      if (fileFound) {
        try {
          const fileFetch = await fetch(fileFound.download_url);
          file.code = await fileFetch.text();
        } catch (error) {
          console.error("Failed to fetch file content:", error);
        }
      }
    }
  }

  return (
    <FileSelected>
      <Container>
        <div className="m-0 md:m-4">
          <DeployedDetail hook={hook} deployment={deploymentDetails} />
        </div>
        <Drawer>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={18}
              className="m-0 md:m-4 hidden md:block"
              minSize={18}
            >
              <Card>
                <CardHeader>
                  <CardTitle>File explorer</CardTitle>
                  <CardDescription>
                    {hook.title} - {hook.description}
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <FileTree nodes={tree as TreeType[]} hookId={hook.id} />
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle className="hidden md:inline-block" />

            <ResizablePanel
              defaultSize={82}
              minSize={60}
              className="m-0 py-4 md:m-4 md:py-0"
            >
              <Card>
                <CardHeader className="block md:hidden">
                  <CardTitle className="flex justify-between items-center py-2">
                    <div>File explorer</div>

                    <DrawerTrigger>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-5 h-5 ml-auto"
                      >
                        <Icons.orderbook />
                      </Button>
                    </DrawerTrigger>
                    <FileExplorer tree={tree as TreeFile[]} hook={hook} />
                  </CardTitle>

                  <CardDescription>
                    {hook.title} - {hook.description}
                  </CardDescription>
                  <Separator />
                </CardHeader>

                {!file.code && (
                  <div className="flex items-center justify-center h-[665px]">
                    <EmptyPlaceholder className="text-center">
                      <EmptyPlaceholder.Title>
                        Open a file
                      </EmptyPlaceholder.Title>
                      <EmptyPlaceholder.Description>
                        Select a file from the file explorer to view it&apos;s
                        content.
                      </EmptyPlaceholder.Description>
                    </EmptyPlaceholder>
                  </div>
                )}

                {file.code && (
                  <div>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <SelectedFiles
                          link={`/hooks/hook/${hook.id}/`}
                          selected={file}
                        />
                        <CopyButtons
                          code={file.code}
                          link={`${process.env.NEXT_PUBLIC_URL}/hooks/hook/${hook.id}/?path=${file.path}`}
                        />
                      </CardTitle>
                      <Separator />
                    </CardHeader>
                    <CardContent className="min-w-full">
                      <SyntaxHighler code={file.code} />
                    </CardContent>
                  </div>
                )}
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Drawer>
      </Container>
    </FileSelected>
  );
}
