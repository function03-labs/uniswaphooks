export type HookType = {
  id: string;
  title: string;
  description: string;
  creator: string;
  github: string;
  status: string;

  userId: string;

  categoryId: string;
  category: CategoryType;

  networkId: string;
  network: NetworkType;

  contractId: string;
  contract: ContractType;

  deploymentDateId: string;
  deploymentDate: DeploymentDateType;

  createdAt?: string;
  updatedAt: string;
};

export type NetworkType = {
  id: string;
  name: string;
  imageUrl: string;
  verified: boolean;
};

export type DeploymentDateType = {
  id: string;
  date: string;
  datetime: string;
};

export type ContractType = {
  id: string;
  deploymentAddress: string;
  contractName: string;
  compilerVersion: string;
  creator: string;
  transactionHash: string;
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
  id: string;
  title: string;
  description: string;
  creator: string;
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
