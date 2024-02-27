export type HookType = {
  id: number;
  categoryId: string;
  title: string;
  description: string;
  creator: string;
  website: string;
  github: string;
  status: string;
  category: CategoryType;
  createdAt?: string;
  updatedAt: string;
};

export type CategoryType = {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  count: number;
  tag: string;
  hooks?: HookType[];
  createdAt: string;
  updatedAt: string;
};

export type HookEmailType = {
  title: string;
  description: string;
  creator: string;
  website: string;
  github: string;
};

export type HookProps = {
  id: string;
  title: string;
  description: string;
  github: string;
  website: string;
  creator: string;
};
