type TreeFile = {
  type: "file";
  name: string;
  path: string;
  download_url: string;
  extra?: string;
};

type TreeDirectory = {
  type: "directory";
  name: string;
  path: string;
  children: Tree[];
  extra?: string;
};

export type TreeType = TreeFile | TreeDirectory;
