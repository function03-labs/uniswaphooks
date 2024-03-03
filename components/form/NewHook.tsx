"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { extractCreator } from "@lib/utils";
import { hookSchema } from "@config/schema";

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

export default function NewHookForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
  });

  async function onSubmit(values: z.infer<typeof hookSchema>) {
    setLoading(true);
    const creator = extractCreator(values.github);

    try {
      const data = await fetch("/api/hook", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          creator,
          website: "uniswaphooks.com",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      router.push(
        `/dashboard/hook/submit?id=${response.data.id}&step=deployment`
      );

    } catch (error) {
      console.error("Submission error:", error);
      router.push("/error");
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hook name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of your hook." {...field} />
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
            ☑️Submit hook details
          </Button>
        )}
      </form>
    </Form>
  );
}
