import * as z from "zod";

import { uploadFiles } from "@lib/storage";
import { decompressFile } from "@lib/decompress-folder";

interface NamedBlob extends Blob {
  name: string;
}

const routeContextSchema = z.object({
  params: z.object({
    hookId: z.string(),
  }),
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const file = await req.blob();
  const { params } = routeContextSchema.parse(context);

  try {
    const decompressedFiles = (await decompressFile(file)) as NamedBlob[];

    await uploadFiles(decompressedFiles, params.hookId);

    return new Response(
      JSON.stringify({
        message: "Files uploaded successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error processing file:", error);
    return new Response(JSON.stringify({ error: "Failed to upload files" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
