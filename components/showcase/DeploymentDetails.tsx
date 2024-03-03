import Image from "next/image";
import { cn } from "@/lib/utils";

import AddressCopy from "@component/ui/AddressCopy";
import { DeploymentType, StatusesType } from "@/types/deployment";

const statuses: StatusesType = {
  true: "text-green-700 bg-green-50 ring-green-600/20",
  false: "text-red-700 bg-red-50 ring-red-600/10",
};

export default function DeploymentDetails({
  deployment,
}: {
  deployment: DeploymentType;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center gap-x-4">
          <Image
            src={deployment.imageUrl}
            alt={deployment.networkName}
            width={48}
            height={48}
            className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <div className="text-sm font-medium leading-6 text-gray-900">
            {deployment.networkName}
          </div>
        </div>
        <div
          className={cn(
            statuses[deployment.verified.toString()],
            "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
          )}
        >
          {deployment.verified ? "Verified" : "Unverified"}
        </div>
      </div>

      {deployment.verified &&
        deployment.input &&
        deployment.contract &&
        deployment.date && (
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Deployment Address</dt>
              <AddressCopy ethAddress={deployment.input.deploymentAddress} />
            </div>

            {deployment.contract.transactionHash != "N/A" && (
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">TX Hash</dt>
                <AddressCopy ethAddress={deployment.contract.transactionHash} />
              </div>
            )}

            {deployment.contract.creator != "N/A" && (
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Creator</dt>
                <AddressCopy ethAddress={deployment.contract.creator} />
              </div>
            )}

            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Compiler</dt>
              <dd className="text-gray-700 font-mono text-sm border border-gray-200 rounded-md px-2 py-1 truncate">
                {deployment.contract.compilerVersion}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Deployment Date</dt>
              <dd className="text-gray-700">
                <time dateTime={deployment.date.dateTime}>
                  {deployment.date.date}
                </time>
              </dd>
            </div>
          </dl>
        )}
    </div>
  );
}
