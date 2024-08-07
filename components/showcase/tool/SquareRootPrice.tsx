"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import { CopyOutput } from "@/components/ui/CopyOutput"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Icons } from "@/components/overall/Icons"

const formSchema = z.object({
  tokenOne: z.string(),
  tokenTwo: z.string(),
  sqrtPrice: z.string(),
})

export function SquareRootPrice() {
  const [calculatedPrice, setCalculatedPrice] = useState("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const univ3prices = require("@thanpolas/univ3prices")

    const price = univ3prices(
      [values.tokenOne, values.tokenTwo],
      values.sqrtPrice
    ).toAuto()

    setCalculatedPrice(price)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col justify-between gap-6 px-4 sm:flex-row sm:px-8 md:px-12 lg:px-80">
          <FormField
            control={form.control}
            name="tokenOne"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold text-slate-600">
                  Token One
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="18.." {...field} />
                </FormControl>
                <FormDescription>Token One Decimals.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenTwo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold text-slate-600">
                  Token Two
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="18.." {...field} />
                </FormControl>
                <FormDescription>Token Two Decimals.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sqrtPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold text-slate-600">
                  Square Root Price
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="A very large number.."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the Square Root Price.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center justify-center gap-4">
            <Button type="submit" className="p-6">
              <Icons.equal />
            </Button>
            <div className="flex items-center justify-between rounded-md border border-gray-800 bg-white px-4 py-3 font-mono text-sm text-gray-800">
              <div className="flex items-center gap-1 overflow-auto">
                <span className="text-md font-semibold text-slate-600">
                  Price
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {calculatedPrice
                    ? calculatedPrice.length > 15
                      ? `${calculatedPrice.substring(0, 15)}...`
                      : calculatedPrice
                    : "0"}
                </span>
              </div>
              <span className="ml-2 cursor-pointer text-gray-800 duration-200 hover:text-gray-400 active:text-gray-600">
                <CopyOutput value={calculatedPrice} />
              </span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
