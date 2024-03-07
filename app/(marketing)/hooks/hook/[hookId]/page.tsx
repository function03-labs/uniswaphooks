import { findFile } from "@lib/utils";
import { HookType } from "@/types/hook";
import { notFound } from "next/navigation";

import { FileTree } from "@component/ui/Tree";
import { SyntaxHighler } from "@component/ui/SyntaxHighler";

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

  let code;
  if (searchParams.path) {
    const file = findFile(tree, searchParams.path as string);
    if (file) {
      try {
        const fileFetch = await fetch(file.download_url);
        code = await fileFetch.text();
      } catch (error) {
        console.error("Failed to fetch file content:", error);
      }
    }
  }

  return (
    <main>
      <FileTree nodes={tree} hookId={hook.id} />

      {!code && <>Select a file</>}
      {code && <SyntaxHighler code={code} />}
    </main>
  );
}
