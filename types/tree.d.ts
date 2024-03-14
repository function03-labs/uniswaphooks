type TreeFile = {
  type: "file";
  name: string;
  path: string;
  download_url: string;
  extra?: string;
  code?: string;
};

type TreeDirectory = {
  type: "directory";
  name: string;
  path: string;
  files: Tree[];
  extra?: string;
};

export type FileOrDirectory = {
  name: string;
  type: "file" | "directory";
};

export type TreeType = TreeFile | TreeDirectory;
