import admZip from "adm-zip";

interface NamedBlob extends Blob {
  name: string;
}

export async function decompressFile(file: Blob): Promise<NamedBlob[]> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const zip = new admZip(buffer);
  const zipEntries = zip.getEntries();
  const decompressedFiles: NamedBlob[] = [];

  for (const zipEntry of zipEntries) {
    if (!zipEntry.isDirectory) {
      const fileData = zip.readFile(zipEntry);
      if (fileData !== null) {
        const blob = new Blob([fileData], {
          type: "application/octet-stream",
        });
        const decompressedFile = new Blob([blob], {
          type: "application/octet-stream",
        });
        const namedBlob = Object.assign(decompressedFile, {
          name: zipEntry.entryName,
        });
        decompressedFiles.push(namedBlob as NamedBlob);
      }
    }
  }

  return decompressedFiles;
}
