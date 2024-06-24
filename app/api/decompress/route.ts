import { decompressFile } from "@lib/decompress-folder"

interface NamedBlob extends Blob {
  name: string
}
export async function POST(req: Request) {
  const file = await req.blob()

  try {
    const decompressedFiles = (await decompressFile(file)) as NamedBlob[]

    const filePromises = decompressedFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      const byteArray = new Uint8Array(arrayBuffer)
      const stringContent = new TextDecoder().decode(byteArray)
      return {
        name: file.name,
        type: file.type,
        content: stringContent,
      }
    })

    const files = await Promise.all(filePromises)

    return new Response(
      JSON.stringify({
        files,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.log("Error processing file:", error)
    return new Response(JSON.stringify({ error: "Failed to upload files" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
