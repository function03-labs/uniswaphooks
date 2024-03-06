const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

// network: [api, api-sepoli]
export function getEtherscanAPI({
  network,
  action,
  address,
}: {
  network: string;
  action: string;
  address: string;
}) {
  return `https://${network}.etherscan.io/api?module=contract&action=${action}&${address}&apikey=${ETHERSCAN_API_KEY}`;
}

export async function getVerified({
  address,
  network,
}: {
  address: string;
  network: string;
}) {
  const verifiedRequest = await fetch(
    getEtherscanAPI({
      network,
      action: "getabi",
      address,
    })
  );

  const verifiedResponse = await verifiedRequest.json();

  if (verifiedResponse.status === "0") {
    return false;
  }

  return true;
}

export async function getSourceCode({
  address,
  network,
}: {
  address: string;
  network: string;
}) {
  const sourceCodeRequest = await fetch(
    getEtherscanAPI({
      network,
      action: "getsourcecode",
      address,
    })
  );

  const sourceCodeResponse = await sourceCodeRequest.json();

  if (sourceCodeResponse.status === "0") {
    return {
      contractName: "N/A",
      compilerVersion: "N/A",
    };
  }

  return {
    contractName: sourceCodeResponse.result[0].ContractName,
    compilerVersion: sourceCodeResponse.result[0].CompilerVersion,
  };
}

export async function getCreatorTx({
  address,
  network,
}: {
  address: string;
  network: string;
}) {
  const creatorTxRequest = await fetch(
    getEtherscanAPI({
      network,
      action: "getcontractcreation",
      address,
    })
  );

  const creatorTxResponse = await creatorTxRequest.json();

  if (creatorTxResponse.status === "0") {
    return {
      creator: "N/A",
      transactionHash: "N/A",
    };
  }

  return {
    creator: creatorTxResponse.result[0].contractCreator,
    transactionHash: creatorTxResponse.result[0].txHash,
  };
}

// TODO: Get Deployment Date -> 'date'
export async function getDeploymentDate() {
  return {
    //get today date
    date: new Date().toLocaleDateString(),
    dateTime: new Date().toLocaleString(),
  };
}
