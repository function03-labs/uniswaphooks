export type DeploymentType = {
  networkName: string;
  imageUrl: string;
  verified: boolean;
  input?: InputType;
  contract?: ContractType;
  date?: DateType;
};

export type InputType = {
  deploymentAddress: string;
  network: string;
};

export type ContractType = {
  contractName: string;
  compilerVersion: string;
  creator: string;
  transactionHash: string;
};

export type DateType = {
  date: string;
  dateTime: string;
};

export type StatusesType = {
  [key: string]: string;
};
