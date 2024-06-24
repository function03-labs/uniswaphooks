"use client"

import { resourceSchema } from "@config/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@hooks/use-toast"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ResourcePost } from "@/types/post"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

export function ReviewResource({ resource }: { resource: ResourcePost }) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof resourceSchema>>({
    resolver: zodResolver(resourceSchema),
    defaultValues: resource,
  })

  async function onSubmit(data: z.infer<typeof resourceSchema>) {
    try {
      const updatedResource = await fetch(`/api/resource/${resource.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...resource,
          status: data.status,
        }),
      })

      if (!updatedResource.ok) {
        throw new Error("Failed to update Resource")
      }

      toast({
        title: "Resource updated",
        description: "The Resource has been updated.",
      })
    } catch (error) {
      toast({
        title: "Failed to update Resource",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button
          type="submit"
          className="inline-flex w-full items-center rounded-md border-2 border-current bg-black px-3 py-1.5 text-xs font-semibold text-gray-50 transition hover:-rotate-2 hover:scale-110 hover:bg-gray-900 focus:outline-none focus:ring active:text-pink-500"
        >
          ✅Update Resource
        </Button>
      </form>
    </Form>
  )
}
