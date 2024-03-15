import admZip from "adm-zip";

interface NamedBlob extends Blob {
  name: string;
}

export const decompressFile = async (file: Blob): Promise<Blob[]> => {
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
        const decompressedFile = new File([blob], zipEntry.entryName, {
          type: blob.type,
        });
        decompressedFiles.push(decompressedFile);
      }
    }
  }

  return decompressedFiles;
};
