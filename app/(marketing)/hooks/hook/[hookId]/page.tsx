import { notFound } from "next/navigation"
import { buildTreeGithub, buildTreeNode } from "@lib/file-explorer"
import { findFile, formatDeploymentDetails } from "@lib/utils"

import { HookType } from "@/types/hook"
import { TreeFile, TreeType } from "@/types/tree"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Drawer, DrawerTrigger } from "@/components/ui/Drawer"
import { EmptyPlaceholder } from "@/components/ui/EmptyPlaceholder"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"
import { Separator } from "@/components/ui/Separator"
import { SyntaxHighler } from "@/components/ui/SyntaxHighler"
import { FileTree } from "@/components/ui/Tree"
import { FileSelected } from "@/components/config/FileSelected"
import { Container } from "@/components/overall/Container"
import { Icons } from "@/components/overall/Icons"
import { CopyButtons } from "@/components/showcase/CopyButtons"
import { DeployedDetail } from "@/components/showcase/DeploymentDetails"
import { FileExplorer } from "@/components/showcase/FileExplorer"
import { SelectedFiles } from "@/components/showcase/SelectedFiles"

async function getHook({ hookId }: { hookId: string }) {
  const hookFetch = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/hook/${hookId}`,
    {
      method: "GET",
      next: {
        revalidate: 0,
      },
    }
  )

  if (!hookFetch.ok) {
    throw new Error("Failed to fetch hook")
  }

  const hook = await hookFetch.json()

  return hook
}

export default async function ViewHook({
  params,
  searchParams,
}: {
  params: { hookId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const hook = (await getHook({ hookId: params.hookId })) as HookType

  if (!hook) {
    return notFound()
  }

  if (hook.status !== "published") {
    return notFound()
  }

  let tree
  let file = {} as TreeFile

  const deploymentDetails = formatDeploymentDetails(hook)
  if (hook.storageType === "github") {
    tree = await buildTreeGithub({ github: hook.filePath, path: "" })

    if (searchParams.path) {
      const fileFound = findFile(tree, searchParams.path as string)
      file = fileFound as TreeFile
      if (fileFound) {
        try {
          const fileFetch = await fetch(fileFound.download_url)
          file.code = await fileFetch.text()
        } catch (error) {
          console.error("Failed to fetch file content:", error)
        }
      }
    }
  } else if (hook.storageType === "storage") {
    tree = await buildTreeNode(params.hookId, "repositories")
    console.log(tree)
    if (searchParams.path) {
      const fileFound = findFile(tree, searchParams.path as string)
      console.log(fileFound)
      console.log(tree)
      file = fileFound as TreeFile
      if (fileFound) {
        try {
          const fileFetch = await fetch(fileFound.download_url)
          file.code = await fileFetch.text()
        } catch (error) {
          console.log("Failed to fetch file content:", error)
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
              className="m-0 hidden md:m-4 md:block"
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
                  <CardTitle className="flex items-center justify-between py-2">
                    <div>File explorer</div>

                    <DrawerTrigger>
                      <Button
                        size="icon"
                        variant="outline"
                        className="ml-auto h-5 w-5"
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
                  <div className="flex h-[665px] items-center justify-center">
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
                      <CardTitle className="flex items-center justify-between">
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
  )
}
