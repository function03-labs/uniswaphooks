import { notFound } from "next/navigation";
import { HookType } from "@/types/hook";

import { Tree } from "@/components/ui/Tree";

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
    console.log(github);
    const repoFetch = await fetch(
        `https://api.github.com/repos/${github.split("/")[3]}/${github.split("/")[4]
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
    const hook = (await getHook({ hookId: params.hookId })) as HookType;
    console.log(hook);
    if (!hook) {
        return notFound();
    }

    /*     if (hook.status !== "published") {
            return notFound();
        } */

    const tree = await buildTree({ github: hook.github, path: "" });

    return (
        <main>
            <Tree nodes={tree} />
        </main>
    );
}
