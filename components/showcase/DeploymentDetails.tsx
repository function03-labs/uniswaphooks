import Image from "next/image"
import Link from "next/link"

import { DeploymentType, StatusesType } from "@/types/deployment"
import { HookType } from "@/types/hook"

import { cn } from "@/lib/utils"

import { AddressCopy } from "@/components/ui/AddressCopy"
import { Skeleton } from "@/components/ui/Skeleton"
import { Icons } from "@/components/overall/Icons"

const statuses: StatusesType = {
  true: "text-green-700 bg-green-50 ring-green-600/20",
  false: "text-red-700 bg-red-50 ring-red-600/10",
}

export function DeploymentDetails({
  deployment,
}: {
  deployment: DeploymentType
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center gap-x-4">
          <Image
            src={deployment.imageUrl || "/uniswap-hooks-logo.png"}
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
            "rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
          )}
        >
          {deployment.verified ? "Deployed" : "Not deployed"}
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
              <dd className="truncate rounded-md border border-gray-200 px-2 py-1 font-mono text-sm text-gray-700">
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
  )
}

export function DeployedDetail({
  deployment,
  hook,
}: {
  deployment: DeploymentType
  hook: HookType
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center gap-x-4">
          <div className="min-w-0 flex-1">
            <div
              className={cn(
                statuses[deployment.verified.toString()],
                "max-w-fit rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium"
              )}
            >
              {deployment.verified ? "Deployed" : "Not deployed"}
            </div>
            <h3 className="truncate text-sm font-medium text-gray-900">
              {hook.title}
            </h3>
            <p className="truncate text-sm text-gray-500">{hook.description}</p>
          </div>
        </div>
        {hook.storageType === "github" && (
          <div className="space-y-3">
            <Link
              href={hook.filePath}
              target="_blank"
              className="flex items-end justify-center rounded-md p-1 hover:bg-gray-100"
            >
              <Icons.gitHub className="h-4 w-4 text-gray-500" />
            </Link>
          </div>
        )}
      </div>

      {deployment.verified &&
        deployment.input &&
        deployment.contract &&
        deployment.date && (
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Network</dt>
              <dd className="truncate px-2 py-1  font-mono text-sm text-gray-700">
                {hook.network.name}
              </dd>
            </div>
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
              <dd className="truncate rounded-md border border-gray-200 px-2 py-1 font-mono text-sm text-gray-700">
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
  )
}

export function DeployedDetailSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="flex flex-col items-end justify-end gap-y-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </dl>
    </div>
  )
}
