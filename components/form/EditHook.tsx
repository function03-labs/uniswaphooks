"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { hookEditSchema } from "@config/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDeploymentDetails } from "@lib/utils"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CategoryType, HookType } from "@/types/hook"

import { Button } from "@/components/ui/Button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { DeploymentDetails } from "@/components/showcase/DeploymentDetails"

export function EditHook({
  hookData,
  categories,
}: {
  hookData: HookType
  categories: CategoryType[]
}) {
  const [loading, setLoading] = useState(false)
  const deploymentDetails = formatDeploymentDetails(hookData)
  const form = useForm<z.infer<typeof hookEditSchema>>({
    resolver: zodResolver(hookEditSchema),
    defaultValues: {
      ...hookData,
      status: "pending",
    },
  })

  async function onSubmit(values: z.infer<typeof hookEditSchema>) {
    setLoading(true)
    try {
      await fetch(`/api/hook/${hookData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...values,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Submission error:", error)
    }
    setLoading(false)
  }

  return (
    <DialogContent className="max-w-[1200px]">
      <DialogHeader>
        <DialogTitle>Edit Hook</DialogTitle>
        <DialogDescription>Edit your hook with ease.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
          className="space-y-8"
        >
          <div className="grid h-[80vh] grid-cols-1 gap-4 overflow-auto md:h-auto md:grid-cols-2">
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of your hook."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name of your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a description for your hook. This will be displayed in the marketplace."
                        className="h-32 md:h-48"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a description for your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.emoji} {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the website of your hook."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the website of your hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-6" />
              <DeploymentDetails deployment={deploymentDetails} />
              {!deploymentDetails.verified && (
                <Link
                  href={`/dashboard/hook/submit?id=${hookData.id}&step=deployment`}
                >
                  <Button className="w-full py-2">📋Deploy now</Button>
                </Link>
              )}
              {hookData.storageType === "github" && (
                <>
                  <div className="h-6" />
                  <FormField
                    control={form.control}
                    name="filePath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Repository</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/username/repo"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the github repository of your hook.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>

          {loading ? (
            <Button
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
              type="submit"
            >
              🔃Submitting...
            </Button>
          ) : (
            <Button
              className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
              type="submit"
            >
              ☑️Submit
            </Button>
          )}
        </form>
      </Form>
    </DialogContent>
  )
}
