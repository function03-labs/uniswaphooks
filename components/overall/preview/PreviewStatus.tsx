"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@hooks/use-toast"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

const statusSchema = z.object({
  status: z.string(),
})

export function PreviewStatus({
  id,
  status,
  tagType,
  role,
  variant,
}: {
  id: string
  status?: string
  tagType?: string
  role?: string
  variant?: string
}) {
  const { toast } = useToast()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: status,
    },
  })

  async function onSubmit(data: z.infer<typeof statusSchema>) {
    try {
      const update = await fetch(`/api/${variant}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: data.status,
        }),
      })

      if (!update.ok) {
        throw new Error("Failed to update")
      }

      toast({
        title: "Updated successfully",
        description: "We have updated the status.",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to update",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      form.reset()
      window.location.reload()
    }
  }
  const isPublished = (status || tagType) === "published"
  const isPending = (status || tagType) === "pending"
  const isDraft = (status || tagType) === "draft"
  const isDeclined = (status || tagType) === "declined"

  if (!isPublished && !isPending && !isDeclined && !isDraft) {
    return <></>
  }

  if (role === "admin") {
    return (
      <div className="mt-1 block">
        {!isSelectVisible && (
          <button
            className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-gray-900 px-3 py-1.5 ${
              isPublished && "bg-green-700 text-green-100"
            } ${isPending && "bg-yellow-700 text-yellow-100"} ${
              isDeclined && "bg-red-700 text-red-100"
            } ${isDraft && "bg-gray-700 text-gray-100"}`}
            onClick={() => setIsSelectVisible(!isSelectVisible)}
          >
            <span className="text-xs font-medium">
              {status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
            </span>
          </button>
        )}
        {isSelectVisible && (
          <Form {...form}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={async (value) => {
                      field.onChange(value)
                      await onSubmit({ status: value })
                      setIsSelectVisible(false)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">✅Approved</SelectItem>
                      <SelectItem value="pending">🟨Pending</SelectItem>
                      <SelectItem value="draft">⬛Draft</SelectItem>
                      <SelectItem value="declined">❌Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        )}
      </div>
    )
  }

  return (
    <button className="mt-1 block">
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-gray-900 px-3 py-1.5 ${
          isPublished && "bg-green-700 text-green-100"
        } ${isPending && "bg-yellow-700 text-yellow-100"} ${
          isDeclined && "bg-red-700 text-red-100"
        } ${isDraft && "bg-gray-700 text-gray-100"}`}
      >
        <span className="text-xs font-medium">
          {status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : tagType
              ? tagType.charAt(0).toUpperCase() + tagType.slice(1)
              : null}
        </span>
      </span>
    </button>
  )
}
