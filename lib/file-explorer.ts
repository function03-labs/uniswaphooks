import { supabase } from "@lib/supabase"
import { getItemType } from "@lib/utils"

import { TreeType } from "@/types/tree"

async function getRepository({
  github,
  path,
}: {
  github: string
  path?: string
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
  )

  if (!repoFetch.ok) {
    throw new Error("Failed to fetch repo")
  }

  const repoContent = await repoFetch.json()

  return repoContent
}

export async function buildTreeGithub({
  github,
  path,
}: {
  github: string
  path: string
}) {
  const contents = await getRepository({ github, path })
  const tree = await Promise.all(
    contents.map(async (item: any) => {
      if (item.type === "dir") {
        return {
          type: "directory",
          name: item.name,
          path: item.path,
          files: await buildTreeGithub({ github, path: item.path }),
        }
      } else {
        return {
          type: "file",
          name: item.name,
          path: item.path,
          download_url: item.download_url,
          extra: `${Math.floor(item.size / 102.4) / 10} kb`,
        }
      }
    })
  )

  return tree
}

async function fetchFilesAndDirectories({
  bucketName,
  path,
}: {
  bucketName: string
  path: string
}) {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list(path)

    if (error) {
      throw error
    }

    const filesAndDirectories = data.map((item) => {
      return {
        name: item.name,
        type: getItemType(item),
        path: path.includes("/")
          ? `${path.split("/").slice(1).join("/")}/${item.name}`
          : item.name,
        size: item.metadata?.size
          ? `${Math.floor(item.metadata.size / 102.4) / 10} kb`
          : undefined,
      }
    })

    return filesAndDirectories
  } catch (error) {
    console.error("Error fetching files and directories:", error)
    throw error
  }
}

export async function buildTreeNode(parentPath: string, bucketName: string) {
  const filesAndDirectories = await fetchFilesAndDirectories({
    bucketName,
    path: parentPath,
  })

  const treeNode: TreeType[] = []
  for (const item of filesAndDirectories) {
    const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name

    if (item.type === "directory") {
      const childNodes = await buildTreeNode(currentPath, bucketName)

      treeNode.push({
        type: "directory",
        name: item.name,
        path: currentPath,
        files: childNodes,
      })
    } else {
      treeNode.push({
        type: "file",
        name: item.name,
        path: item.path,
        download_url: `${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/storage/v1/object/public/${bucketName}/${encodeURI(
          currentPath
        ).replace(/%2F/g, "/")}`,

        extra: item.size,
      })
    }
  }

  return treeNode
}
