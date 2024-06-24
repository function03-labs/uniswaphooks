"use client"

import { hookSchema } from "@config/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@hooks/use-toast"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { HookType } from "@/types/hook"

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

export function ReviewHook({ hook }: { hook: HookType }) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
    defaultValues: hook,
  })

  async function onSubmit(data: z.infer<typeof hookSchema>) {
    try {
      const updatedHook = await fetch(`/api/hook/${hook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: data.status,
        }),
      })

      if (!updatedHook.ok) {
        throw new Error("Failed to update hook")
      }

      toast({
        title: "Hook updated",
        description: "The hook has been updated.",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to update hook",
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
          ✅Update Hook
        </Button>
      </form>
    </Form>
  )
}
