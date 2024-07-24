"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sections } from "@config/community"
import { resourceSchema } from "@config/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@lib/utils"
import { Check, ChevronsUpDown, SmilePlus } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Textarea } from "@/components/ui/Textarea"
import { EmojiPicker } from "@/components/emoji-picker/EmojiPicker"

export function NewResourceForm({ user }: { user: any }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof resourceSchema>>({
    resolver: zodResolver(resourceSchema),
  })

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  async function onSubmit(values: z.infer<typeof resourceSchema>) {
    if (!values.emoji) {
      values.emoji = sections.find(
        (section) => section.id === values.section
      )?.emoji
    }

    try {
      const requestResource = await fetch("/api/resource", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await requestResource.json()

      router.push("/dashboard/thank-you")

      await fetch("/api/mailer", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          id: response.data.id,
          user: user.email,
          type: "resources",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log("Submission error:", error)
      router.push("/error")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-1 xl:grid-cols-6 xl:gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="xl:col-span-5">
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="focus:outline-none">
                          {selectedEmoji ? (
                            <span className="text-2xl">{selectedEmoji}</span>
                          ) : (
                            <SmilePlus
                              className="h-6 w-6 text-gray-500"
                              role="button"
                            />
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full bg-transparent p-0">
                        <EmojiPicker
                          onSelect={(emoji) => {
                            setSelectedEmoji(emoji)
                            form.setValue("emoji", emoji)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      placeholder="Title of the educational resource..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Please provide the title of the educational resource.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Section <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between border-gray-500 text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value &&
                          sections.find((section) => section.id === field.value)
                            ?.emoji}{" "}
                        {field.value
                          ? sections.find(
                              (section) => section.id === field.value
                            )?.title
                          : "Select section"}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search section..." />
                      <CommandEmpty>No section found.</CommandEmpty>
                      <CommandGroup>
                        {sections.map((section) => (
                          <CommandItem
                            key={section.id}
                            value={section.title}
                            onSelect={() => {
                              form.setValue("section", section.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === section.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {section.emoji} {section.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Please choose a section.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short description of the educational resource..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The content of the educational resource.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resourceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Resource URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="URL of the educational resource..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide the URL of the educational resource.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
