import * as z from "zod";

import { uploadFiles } from "@lib/storage";
import { decompressFile } from "@lib/decompress-folder";

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
    const fileObj = new File([file], "filename");
    const decompressedFiles = await decompressFile(fileObj);

    const uploads = await uploadFiles(decompressedFiles, params.hookId);

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
    return new Response(
      JSON.stringify({ error: "Failed to decompress files" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
