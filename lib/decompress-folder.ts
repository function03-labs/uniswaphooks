import admZip from "adm-zip";

export const decompressFile = async (file: File): Promise<File[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const zip = new admZip(buffer);
  const zipEntries = zip.getEntries();
  const decompressedFiles: File[] = [];

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

  console.log("Decompressed files:", decompressedFiles);
  return decompressedFiles;
};
