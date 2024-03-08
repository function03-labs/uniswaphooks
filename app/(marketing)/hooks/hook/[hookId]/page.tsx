import { findFile } from "@lib/utils";
import { TreeFile } from "@/types/tree";
import { HookType } from "@/types/hook";
import { notFound } from "next/navigation";

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
import { Button } from "@component/ui/Button";
import { FileTree } from "@component/ui/Tree";
import { Icons } from "@component/overall/Icons";
import { Separator } from "@component/ui/Separator";
import { SyntaxHighler } from "@component/ui/SyntaxHighler";
import { EmptyPlaceholder } from "@component/ui/EmptyPlaceholder";

import Container from "@component/overall/Container";

async function getHook({ hookId }: { hookId: string }) {
  const hookFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_DEV}/api/hook/${hookId}`,
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

async function getRepository({
  github,
  path,
}: {
  github: string;
  path?: string;
}) {
  const repoFetch = await fetch(
    `https://api.github.com/repos/${github.split("/")[3]}/${
      github.split("/")[4]
    }/contents/${path}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (!repoFetch.ok) {
    console.log(repoFetch);
    throw new Error("Failed to fetch repo");
  }

  const repoContent = await repoFetch.json();

  return repoContent;
}

async function buildTree({ github, path }: { github: string; path: string }) {
  const contents = await getRepository({ github, path });
  const tree = await Promise.all(
    contents.map(async (item: any) => {
      if (item.type === "dir") {
        return {
          type: "directory",
          name: item.name,
          path: item.path,
          files: await buildTree({ github, path: item.path }),
        };
      } else {
        return {
          type: "file",
          name: item.name,
          path: item.path,
          download_url: item.download_url,
          extra: `${Math.floor(item.size / 102.4) / 10} kb`,
        };
      }
    })
  );
  return tree;
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

  /*     if (hook.status !== "published") {
            return notFound();
        } */

  const tree = await buildTree({ github: hook.github, path: "" });

  let file = {} as TreeFile;
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

  return (
    <Container>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={18} className="m-4" minSize={18}>
          <Card>
            <CardHeader>
              <CardTitle>File explorer</CardTitle>
              <CardDescription>
                {hook.title} - {hook.description}
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              <FileTree nodes={tree} hookId={hook.id} />
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82} minSize={60} className="m-4">
          <Card>
            {!file.code && (
              <div className="flex items-center justify-center h-[665px]">
                <EmptyPlaceholder className="text-center">
                  <EmptyPlaceholder.Title>Open a file</EmptyPlaceholder.Title>
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
                    <div>
                      {file.name}{" "}
                      <span className="text-sm text-gray-400">
                        {file.extra}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button size="icon" variant="outline" className="w-5 h-5">
                        <Icons.copy />
                      </Button>
                      <Button size="icon" variant="outline" className="w-5 h-5">
                        <Icons.link />
                      </Button>
                    </div>
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="min-w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                    <SyntaxHighler code={file.code} />
                  </div>
                </CardContent>
              </div>
            )}
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  );
}
