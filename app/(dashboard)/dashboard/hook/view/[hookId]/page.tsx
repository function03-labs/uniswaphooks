import { getCurrentUser } from "@lib/session";
import { notFound, redirect } from "next/navigation";

import { Tree } from "@/components/ui/Tree";

import { HookType } from "@/types/hook";

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
          children: await buildTree({ github, path: item.path }),
        };
      } else {
        return {
          type: "file",
          name: item.name,
          path: item.path,
          download_url: item.download_url,
        };
      }
    })
  );
  return tree;
}

export default async function ViewHook({
  params,
}: {
  params: { hookId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const hook = (await getHook({ hookId: params.hookId })) as HookType;

  if (!hook) {
    return notFound();
  }

  if (
    user.role !== "admin" &&
    user.id !== hook.userId &&
    hook.status !== "published"
  ) {
    return notFound();
  }

  const tree = await buildTree({ github: hook.github, path: "" });

  return (
    <main>
      <Tree nodes={tree} />
    </main>
  );
}
