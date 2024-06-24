"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { ChainPost } from "@/types/chain"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Icons } from "@/components/shared/icons"

function InputCard({
  name,
  value,
  copy,
}: {
  name: string
  value: string
  copy?: boolean
}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed", error)
      setIsCopied(false)
    }
  }
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2 self-center ">
      <div className="flex w-3/4 items-center justify-between rounded-md border border-gray-800 bg-white px-2 py-3 font-mono text-sm text-gray-800">
        <span className="w-[50%] shrink-0 overflow-hidden text-ellipsis  text-nowrap border-r-2 pr-2 font-semibold text-slate-600">
          {name}
        </span>

        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pl-2">
          {value}
        </span>
      </div>

      {copy && (
        <button
          onClick={handleCopy}
          className="max-w-1/4 flex items-center justify-center rounded-md border border-gray-800 p-2 px-4 text-gray-800 duration-200 hover:text-gray-400 active:text-gray-600"
        >
          {isCopied ? (
            <Icons.checkIcon width={20} />
          ) : (
            <Icons.copy width={20} />
          )}{" "}
        </button>
      )}
    </div>
  )
}

function SliderCard(chainPost: ChainPost) {
  return (
    <div className="">
      <InputCard
        name="ModifyLiqTest"
        value={chainPost.poolModifyLiquidityTest}
        copy={true}
      />
      <InputCard
        name="PoolSwapTest"
        value={chainPost.poolSwapTest}
        copy={true}
      />
      <InputCard name="Quoter" value={chainPost.quoter} copy={true} />
    </div>
  )
}

export function ChainCard(chainPost: ChainPost) {
  return (
    <div className="group  relative block h-full w-full bg-white font-sans before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed  before:border-gray-900">
      <div className="h-full overflow-auto rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
        <div className="xs:p-2 overflow-auto p-8 sm:p-6 lg:p-4">
          {chainPost.docs ? (
            <Link href={chainPost.docs} target="_blank">
              <span className="absolute right-3 flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="whitespace-nowrap text-sm">Official</p>
              </span>
            </Link>
          ) : null}

          <div className="mb-6 mt-3 flex items-center justify-center gap-2 align-baseline">
            <Image
              aria-hidden="true"
              src={chainPost.logo}
              alt={chainPost.title}
              className="rounded-full bg-gray-100"
              width={32}
              height={32}
            />

            <h2 className="text-lg font-medium text-gray-900 sm:text-xl">
              {chainPost.title}
            </h2>
          </div>

          <div className="mt-4 flex items-center justify-center px-28">
            <p className="sm:text-md flex flex-col items-center gap-2 px-4 text-sm">
              <span className="text-md font-semibold text-slate-600">
                ChainID
              </span>
              <span className="overflow-hidden text-ellipsis text-lg font-bold text-slate-900">
                {chainPost.chainID}
              </span>
            </p>
            <p className="sm:text-md flex flex-col items-center gap-2 text-sm">
              <span className="text-md font-semibold text-slate-600">
                Currency
              </span>
              <span className="text-lg font-bold text-slate-900">
                {chainPost.currency}
              </span>
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-2 space-y-1 ">
            <InputCard
              name="Pool Manager"
              value={chainPost.poolManager}
              copy={true}
            />
            {chainPost.poolInitializeTest &&
            chainPost.poolModifyLiquidityTest &&
            chainPost.poolSwapTest ? (
              <Accordion type="single" collapsible className="w-full ">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex h-8 items-center justify-center hover:rounded-md hover:bg-gray-200/30">
                    <span className="text-md px-2 font-semibold text-slate-600">
                      See more
                    </span>
                    <Icons.chevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="py-1 ">
                    <SliderCard {...chainPost} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
