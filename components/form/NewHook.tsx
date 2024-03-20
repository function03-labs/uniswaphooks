"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { hookSchema } from "@config/schema";
import { CategoryType } from "@/types/hook";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@component/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@component/ui/Select";
import { Input } from "@component/ui/Input";
import { Button } from "@component/ui/Button";
import { Textarea } from "@component/ui/Textarea";

export default function NewHookForm({
  categories,
}: {
  categories: CategoryType[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof hookSchema>>({
    resolver: zodResolver(hookSchema),
    defaultValues: {
      categoryId: "from-the-community",
    },
  });

  async function onSubmit(values: z.infer<typeof hookSchema>) {
    setLoading(true);

    try {
      const data = await fetch("/api/hook", {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      router.push(`/dashboard/hook/submit?id=${response.data.id}&step=upload`);
    } catch (error) {
      console.error("Submission error:", error);
      router.push("/error");
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="md:flex md:items-center md:space-x-2 xs:space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Hook name</FormLabel>
                <FormControl className="flex">
                  <Input
                    placeholder="Enter the name of your hook."
                    className="flex-grow"
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="mt-4 md:-mt-7">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="md:w-[210px]">
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
          name="website"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Website</FormLabel>
              <FormControl className="flex">
                <Input
                  placeholder="Enter the website URL for your hook."
                  className="flex-grow"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the website URL for your hook.
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
