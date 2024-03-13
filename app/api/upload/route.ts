import { decompressFile } from "@lib/decompress-folder";

export async function POST(req: Request) {
  const file = await req.blob();

  try {
    const fileObj = new File([file], "filename");
    const decompressedFiles = await decompressFile(fileObj);

    // TODO: let's upload them to supabase

    return new Response(
      JSON.stringify({
        message: "Files decompressed successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
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
      },
    );
  }
}
