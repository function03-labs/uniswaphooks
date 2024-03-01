"use client";

import * as z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { extractCreator } from "@lib/utils";
import { hookSchema } from "@config/schema";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@component/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@component/ui/Form";
import { Input } from "@component/ui/Input";
import { Button } from "@component/ui/Button";
import { Textarea } from "@component/ui/Textarea";

import { HookType } from "@/types/hook";

export default function EditHook({ hookData }: { hookData: HookType }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
    defaultValues: {
      title: hookData.title,
      description: hookData.description,
      github: hookData.github,
    },
  });

  async function onSubmit(values: z.infer<typeof hookSchema>) {
    const creator = extractCreator(values.github);

    try {
      setLoading(true);
      await fetch(`/api/hook/${hookData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          creator,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });      

      setLoading(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Hook</DialogTitle>
        <DialogDescription>Edit your hook with ease.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormDescription>Enter the name of your hook.</FormDescription>
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
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repository</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/author/repo..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the URL of your GitHub repository.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
  );
}
